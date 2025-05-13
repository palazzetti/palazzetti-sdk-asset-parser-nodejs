import semverCompare from 'semver-compare';

import AssetParserSchema from '../assets/AssetParserSchema.js';
import { Capabilities } from '../interfaces/Capabilities.js';
import { AssetCapabilities } from './AssetCapabilities.js';

export enum AssetParserDictionary {
    ALLS = 'GET_ALLS',
    STDT = 'GET_STDT',
}

export class AssetParser {
    private _alls: any;
    private _stdt: any;
    private _grammar: any;

    constructor({ get_alls, get_stdt }: { get_alls?: any; get_stdt: any }) {
        this._grammar = AssetParserSchema;
        this._alls = get_alls;
        this._stdt = get_stdt;
    }

    set alls(alls: any) {
        this._alls = { ...(this._alls ?? {}), ...(alls ?? {}) };
    }

    set stdt(stdt: any) {
        this._stdt = { ...(this._stdt ?? {}), ...(stdt ?? {}) };
    }

    private value(dictName: AssetParserDictionary, key: string) {
        const k = key;
        const sourceDict = this.dict(dictName);

        if (!k || !sourceDict) return;
        if (!sourceDict.hasOwnProperty(k)) return;

        return sourceDict[`${k}`];
    }

    private dict(key: AssetParserDictionary) {
        const _dict = {
            [AssetParserDictionary.ALLS]: this._alls,
            [AssetParserDictionary.STDT]: this._stdt,
        };

        return _dict[key] ?? undefined;
    }

    private evaluate({
        path: statementPath,
        key: statementKey,
        value: statementValue,
        operator: statementOperator,
    }: {
        path: AssetParserDictionary;
        key: string;
        value?: any;
        operator?: string;
    }) {
        const _optionalValue = this.value(statementPath, statementKey);
        const _operator = statementOperator ?? ''.toLowerCase();

        switch (_operator) {
            case 'in':
                try {
                    return statementValue.filter((v: any) => parseInt(v) == parseInt(_optionalValue)).length > 0;
                } catch (ex) {
                    return false;
                }
                break;
            case 'nin':
                try {
                    return !statementValue.filter((v: any) => parseInt(v) == parseInt(_optionalValue)).length;
                } catch (ex) {
                    return false;
                }
                break;
            case 'eq':
                try {
                    return parseInt(_optionalValue) == parseInt(statementValue);
                } catch (ex) {
                    return false;
                }
                break;
            case 'neq':
                try {
                    return parseInt(_optionalValue) != parseInt(statementValue);
                } catch (ex) {
                    return false;
                }
                break;
            case 'gt':
                try {
                    return parseInt(_optionalValue) > parseInt(statementValue);
                } catch (ex) {
                    return false;
                }
                break;
            case 'lt':
                try {
                    return parseInt(_optionalValue) < parseInt(statementValue);
                } catch (ex) {
                    return false;
                }
                break;
            case 'lte':
                try {
                    return parseInt(_optionalValue) <= parseInt(statementValue);
                } catch (ex) {
                    return false;
                }
                break;
            case 'gte':
                try {
                    return parseInt(_optionalValue) >= parseInt(statementValue);
                } catch (ex) {
                    return false;
                }
                break;
            case 'vgt':
                try {
                    return (
                        semverCompare(this.formattedVersion(_optionalValue), this.formattedVersion(statementValue)) > 0
                    );
                } catch (ex) {
                    return false;
                }
                break;
            case 'vgte':
                try {
                    return (
                        semverCompare(this.formattedVersion(_optionalValue), this.formattedVersion(statementValue)) >= 0
                    );
                } catch (ex) {
                    return false;
                }
                break;
            default:
                return false;
                break;
        }

        return false;
    }

    private formattedVersion(rawVersion: string) {
        const _versionParts = rawVersion.replace(/\n/g, '').replace(/\r/g, '').split(' ')[0].split('.');
        return `${_versionParts[0] || '0'}.${_versionParts[1] || '0'}.${_versionParts[2] || '0'}`;
    }

    private parse(): Capabilities {
        const _parsedObject: any = {};

        Object.keys(this._grammar).forEach((currKey) => {
            const currValue = this._grammar[`${currKey}`];

            if (Array.isArray(currValue)) {
                const _evaluationResult = currValue.filter((v) => !this.evaluate(v));
                _parsedObject[`${currKey}`] = !_evaluationResult.length;
                return;
            }

            if (typeof currValue === 'object') {
                // Other case includes a double check and retrive from both the dictionary or only one with index
                // get requested `key` in source dictionary specified by `path` value

                const _rawValue = this.value(currValue['path'], currValue['key']);

                if (_rawValue === undefined) return;

                if (!currValue['map_keys'] && !Array.isArray(_rawValue)) {
                    _parsedObject[`${currKey}`] = _rawValue;
                    return;
                }

                // support array of ints
                if (!currValue['map_keys'] && Array.isArray(_rawValue)) {
                    _parsedObject[`${currKey}`] = _rawValue.map((v) => parseInt(v));
                    return;
                }

                const _sourceArray = currValue['map_keys'];
                const _index = parseInt(_rawValue);

                if (!_sourceArray || isNaN(_index)) return;
                if (_index >= _sourceArray.length) return;

                if (!currValue['map_path']) {
                    _parsedObject[`${currKey}`] = `${_sourceArray[_index]}`;
                    return;
                }

                _parsedObject[`${currKey}`] = this.value(currValue['map_path'], _sourceArray[_index]) || '';
                return;
            }

            // Is a numeric value
            if (!isNaN(currValue)) {
                _parsedObject[`${currKey}`] = Number.isInteger(currValue)
                    ? parseInt(currValue)
                    : parseFloat(currValue).toFixed(2);
                return;
            }

            if (currValue === 'false' || currValue === 'true') {
                _parsedObject[`${currKey}`] = currValue === 'false' ? false : true;
                return;
            }

            _parsedObject[`${currKey}`] = `${currValue}`;
        });

        return JSON.parse(JSON.stringify(_parsedObject));
    }

    get parsedData(): AssetCapabilities {
        return new AssetCapabilities(this.parse());
    }
}

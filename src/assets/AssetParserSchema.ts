const AssetParserSchema = {
    flag_assenza_regolazione_potenza: [
        {
            path: 'GET_STDT',
            key: 'STOVETYPE',
            operator: 'eq',
            value: 8,
        },
    ],
    flag_modalita_ecostart: [
        {
            path: 'GET_STDT',
            key: 'SYSTEM',
            operator: 'vgt',
            value: '10000.0.0',
        },
    ],
    flag_sincronizzazione_orario: [
        {
            path: 'GET_STDT',
            key: 'SYSTEM',
            operator: 'vgt',
            value: '10000.0.0',
        },
    ],
    flag_presenza_chrono: [
        {
            path: 'GET_STDT',
            key: 'CHRONOTYPE',
            operator: 'gt',
            value: 1,
        },
    ],
    flag_impostazione_setpoint: [
        {
            path: 'GET_ALLS',
            key: 'SETP',
            operator: 'neq',
            value: 0,
        },
    ],
    flag_accensione_macchina: [
        {
            path: 'GET_STDT',
            key: 'STOVETYPE',
            operator: 'nin',
            value: [7, 8],
        },
        {
            path: 'GET_ALLS',
            key: 'LSTATUS',
            operator: 'in',
            value: [0, 1, 6, 7, 9, 11, 12, 51, 501, 504, 505, 506, 507],
        },
    ],
    flag_presenza_errore_macchina: [
        {
            path: 'GET_ALLS',
            key: 'LSTATUS',
            operator: 'gte',
            value: 1000,
        },
    ],
    flag_prenotazione_accensione_pellet: [
        {
            path: 'GET_STDT',
            key: 'STOVETYPE',
            operator: 'in',
            value: [3, 4],
        },
    ],
    flag_tipologia_aria: [
        {
            path: 'GET_STDT',
            key: 'STOVETYPE',
            operator: 'in',
            value: [1, 3, 5, 7, 8],
        },
    ],
    flag_tipologia_idro: [
        {
            path: 'GET_STDT',
            key: 'STOVETYPE',
            operator: 'in',
            value: [2, 4, 6],
        },
    ],
    flag_presenza_ventilatore: [
        {
            path: 'GET_STDT',
            key: 'FAN2TYPE',
            operator: 'gt',
            value: 1,
        },
    ],
    value_fan_function_first: {
        path: 'GET_ALLS',
        key: 'F2LF',
    },
    flag_presenza_zero_speed_fan: [
        {
            path: 'GET_STDT',
            key: 'FAN2TYPE',
            operator: 'gt',
            value: 2,
        },
    ],
    flag_presenza_ventilatore_mod_auto: [
        {
            path: 'GET_STDT',
            key: 'FAN2MODE',
            operator: 'in',
            value: [2, 3],
        },
    ],
    flag_presenza_ventilatore_mod_high: [
        {
            path: 'GET_STDT',
            key: 'FAN2MODE',
            operator: 'eq',
            value: 3,
        },
    ],
    flag_presenza_ventilatore_mod_prop: [
        {
            path: 'GET_STDT',
            key: 'FAN2MODE',
            operator: 'eq',
            value: 4,
        },
    ],
    flag_presenza_primo_ventilatore: [
        {
            path: 'GET_STDT',
            key: 'FAN2TYPE',
            operator: 'gt',
            value: 1,
        },
    ],
    flag_presenza_secondo_ventilatore: [
        {
            path: 'GET_STDT',
            key: 'FAN2TYPE',
            operator: 'gt',
            value: 2,
        },
    ],
    flag_presenza_terzo_ventilatore: [
        {
            path: 'GET_STDT',
            key: 'FAN2TYPE',
            operator: 'gt',
            value: 3,
        },
    ],
    flag_presenza_sensore_pellet_leveltronic: [
        {
            path: 'GET_STDT',
            key: 'PSENSTYPE',
            operator: 'eq',
            value: 1,
        },
    ],
    flag_presenza_sensore_pellet_capacitivo: [
        {
            path: 'GET_STDT',
            key: 'PSENSTYPE',
            operator: 'eq',
            value: 2,
        },
    ],
    value_leveltronic_minimo: {
        path: 'GET_STDT',
        key: 'PSENSLMIN',
    },
    value_leveltronic_soglia: {
        path: 'GET_STDT',
        key: 'PSENSLTSH',
    },
    value_leveltronic_level: {
        path: 'GET_ALLS',
        key: 'PLEVEL',
    },
    flag_presenza_temperatura_combustione: [
        {
            path: 'GET_STDT',
            key: 'STOVETYPE',
            operator: 'in',
            value: [7, 8],
        },
    ],
    flag_presenza_temperatura_uscita_aria: [
        {
            path: 'GET_STDT',
            key: 'STOVETYPE',
            operator: 'in',
            value: [7, 8],
        },
        {
            path: 'GET_STDT',
            key: 'FAN2TYPE',
            operator: 'gt',
            value: 1,
        },
    ],
    flag_presenza_porta: [
        {
            path: 'GET_STDT',
            key: 'DOORMOTOR',
            operator: 'eq',
            value: 1,
        },
    ],
    flag_presenza_luci: [
        {
            path: 'GET_STDT',
            key: 'LIGHTCONT',
            operator: 'eq',
            value: 1,
        },
    ],
    value_tipologia_macchina: {
        path: 'GET_STDT',
        key: 'STOVETYPE',
    },
    value_accensione_macchina: [
        {
            path: 'GET_ALLS',
            key: 'STATUS',
            operator: 'nin',
            value: [0, 1],
        },
    ],
    value_descrizione_temperatura_aria: 'kTemperaturaAmbiente',
    value_descrizione_temperatura_idro: {
        path: 'GET_STDT',
        key: 'UICONFIG',
        map_keys: [
            '',
            'kTemperaturaAcquaRitorno',
            'kTemperaturaAmbiente',
            'kTemperaturaAccumulo',
            'kTemperaturaAccumulo',
            'kTemperaturaAmbiente',
            '',
            '',
            '',
            '',
            'kTemperaturaAmbiente',
        ],
    },
    value_descrizione_sonda_t1_idro: 'kTemperaturaAcquaMandata',
    value_temperatura_sonda_principale: {
        path: 'GET_STDT',
        key: 'MAINTPROBE',
        map_path: 'GET_ALLS',
        map_keys: ['T1', 'T2', 'T3', 'T4', 'T5'],
    },
    value_descrizione_sonda_principale: {
        path: 'GET_STDT',
        key: 'MAINTPROBE',
        map_keys: ['T1', 'T2', 'T3', 'T4', 'T5'],
    },
    value_temperatura_sonda_t1_idro: {
        path: 'GET_ALLS',
        key: 'T1',
    },
    value_temperatura_sonda_t2_idro: {
        path: 'GET_ALLS',
        key: 'T2',
    },
    value_temperatura_sonda_combustione_legna: {
        path: 'GET_ALLS',
        key: 'T3',
    },
    value_temperatura_sonda_uscita_aria: {
        path: 'GET_ALLS',
        key: 'T4',
    },
    value_power_rilevato: {
        path: 'GET_ALLS',
        key: 'PWR',
    },
    value_setpoint_minimo: {
        path: 'GET_STDT',
        key: 'SPLMIN',
    },
    value_setpoint_massimo: {
        path: 'GET_STDT',
        key: 'SPLMAX',
    },
    value_setpoint_impostato: {
        path: 'GET_ALLS',
        key: 'SETP',
    },
    value_power_impostato: {
        path: 'GET_ALLS',
        key: 'PWR',
    },
    value_fan_first: {
        path: 'GET_ALLS',
        key: 'F2L',
    },
    value_fan_second: {
        path: 'GET_ALLS',
        key: 'F3L',
    },
    value_fan_third: {
        path: 'GET_ALLS',
        key: 'F4L',
    },
    value_fan_limits: {
        path: 'GET_ALLS',
        key: 'FANLMINMAX',
    },
    value_apertura_porta: {
        path: 'GET_ALLS',
        key: 'DOOR',
    },
    value_accensione_luce: {
        path: 'GET_ALLS',
        key: 'LGHT',
    },
    value_status: {
        path: 'GET_ALLS',
        key: 'LSTATUS',
    },
    flag_presenza_sonde_temperatura_remote: [
        {
            path: 'GET_STDT',
            key: 'BLEMBMODE',
            operator: 'in',
            value: [7, 17],
        },
        {
            path: 'GET_STDT',
            key: 'BLEDSPMODE',
            operator: 'in',
            value: [7, 17],
        },
    ],
    flag_presenza_setpoint_secondo_ventilatore: [
        {
            path: 'GET_BTLE',
            key: 'F3ST',
            operator: 'gt',
            value: 1,
        },
        {
            path: 'GET_BTLE',
            key: 'F3AN',
            operator: 'in',
            value: [2, 3],
        },
    ],
    flag_presenza_setpoint_terzo_ventilatore: [
        {
            path: 'GET_BTLE',
            key: 'F4ST',
            operator: 'gt',
            value: 1,
        },
        {
            path: 'GET_BTLE',
            key: 'F4AN',
            operator: 'in',
            value: [2, 3],
        },
    ],
    value_temperatura_sonda_secondo_ventilatore: {
        path: 'GET_BTLE',
        key: 'F3TP',
    },
    value_temperatura_sonda_terzo_ventilatore: {
        path: 'GET_BTLE',
        key: 'F4TP',
    },
    value_fan_second_setpoint: {
        path: 'GET_BTLE',
        key: 'F3SP',
    },
    value_fan_third_setpoint: {
        path: 'GET_BTLE',
        key: 'F4SP',
    },
};

export default AssetParserSchema;

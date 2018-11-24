(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('dark', {
        "color": [
            "#2babf6",
            "#f86a78",
            "#fcf080",
            "#5af6ff",
            "#ea7e53",
            "#eedd78",
            "#73a373",
            "#73b9bc",
            "#7289ab",
            "#91ca8c",
            "#f49f42"
        ],
        "backgroundColor": "#202f42",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#cfd6e5"
            },
            "subtextStyle": {
                "color": "#cfd6e5"
            }
        },
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "symbolSize": "4",
            "symbol": "circle",
            "smooth": false
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "1"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "2"
                }
            },
            "symbolSize": "4",
            "symbol": "circle",
            "smooth": false
        },
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#cccccc"
                },
                "emphasis": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#cccccc"
                }
            }
        },
        "pie": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                }
            }
        },
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                }
            }
        },
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                }
            }
        },
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                }
            }
        },
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                }
            }
        },
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                }
            }
        },
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#ff4b29",
                    "color0": "#0cf49b",
                    "borderColor": "#fd1050",
                    "borderColor0": "#0cf49b",
                    "borderWidth": 1
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#cccccc"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": 1,
                    "color": "#aaaaaa"
                }
            },
            "symbolSize": "4",
            "symbol": "circle",
            "smooth": false,
            "color": [
                "#2babf6",
                "#f86a78",
                "#fcf080",
                "#5af6ff",
                "#ea7e53",
                "#eedd78",
                "#73a373",
                "#73b9bc",
                "#7289ab",
                "#91ca8c",
                "#f49f42"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#2b4b62",
                    "borderColor": "#4a6f89",
                    "borderWidth": "2"
                },
                "emphasis": {
                    "areaColor": "rgba(42,91,121,1)",
                    "borderColor": "#66bbcf",
                    "borderWidth": "1"
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#4aa0c1"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(255,255,255)"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#2b4b62",
                    "borderColor": "#4a6f89",
                    "borderWidth": "2"
                },
                "emphasis": {
                    "areaColor": "rgba(42,91,121,1)",
                    "borderColor": "#66bbcf",
                    "borderWidth": "1"
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#4aa0c1"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(255,255,255)"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#eeeeee"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#eeeeee"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#eeeeee"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#aaaaaa"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#eeeeee"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#eeeeee"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#eeeeee"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#aaaaaa"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#eeeeee"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#eeeeee"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#eeeeee"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#aaaaaa"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#eeeeee"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                    "color": "#eeeeee"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#eeeeee"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#aaaaaa"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#999999"
                },
                "emphasis": {
                    "borderColor": "#666666"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#eeeeee"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#eeeeee",
                    "width": "1"
                },
                "crossStyle": {
                    "color": "#eeeeee",
                    "width": "1"
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#eeeeee",
                "width": "1"
            },
            "itemStyle": {
                "normal": {
                    "color": "#dd6b66",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#a9334c"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#eeeeee",
                    "borderColor": "#eeeeee",
                    "borderWidth": "0.5"
                },
                "emphasis": {
                    "color": "#eeeeee",
                    "borderColor": "#eeeeee",
                    "borderWidth": "0.5"
                }
            },
            "checkpointStyle": {
                "color": "#e43c59",
                "borderColor": "rgba(194,53,49,0.5)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#2b4b62",
                "#2d4b63",
                "#2d4b63"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(47,69,84,0)",
            "dataBackgroundColor": "rgba(255,255,255,0.3)",
            "fillerColor": "rgba(167,183,204,0.4)",
            "handleColor": "#a7b7cc",
            "handleSize": "99%",
            "textStyle": {
                "color": "#eeeeee"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#eeeeee"
                    }
                }
            }
        }
    });
}));

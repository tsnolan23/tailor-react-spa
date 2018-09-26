var stats = {
    type: "GROUP",
name: "Global Information",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "Global Information",
    "numberOfRequests": {
        "total": "450",
        "ok": "450",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "366",
        "ok": "366",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "4780",
        "ok": "4780",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "2637",
        "ok": "2637",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "802",
        "ok": "802",
        "ko": "-"
    },
    "percentiles1": {
        "total": "2624",
        "ok": "2624",
        "ko": "-"
    },
    "percentiles2": {
        "total": "3107",
        "ok": "3107",
        "ko": "-"
    },
    "percentiles3": {
        "total": "3911",
        "ok": "3911",
        "ko": "-"
    },
    "percentiles4": {
        "total": "4303",
        "ok": "4303",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 14,
        "percentage": 3
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 19,
        "percentage": 4
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 417,
        "percentage": 93
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "13.636",
        "ok": "13.636",
        "ko": "-"
    }
},
contents: {
"req_openapplication-11d62": {
        type: "REQUEST",
        name: "OpenApplication",
path: "OpenApplication",
pathFormatted: "req_openapplication-11d62",
stats: {
    "name": "OpenApplication",
    "numberOfRequests": {
        "total": "450",
        "ok": "450",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "366",
        "ok": "366",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "4780",
        "ok": "4780",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "2637",
        "ok": "2637",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "802",
        "ok": "802",
        "ko": "-"
    },
    "percentiles1": {
        "total": "2624",
        "ok": "2624",
        "ko": "-"
    },
    "percentiles2": {
        "total": "3107",
        "ok": "3107",
        "ko": "-"
    },
    "percentiles3": {
        "total": "3911",
        "ok": "3911",
        "ko": "-"
    },
    "percentiles4": {
        "total": "4303",
        "ok": "4303",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 14,
        "percentage": 3
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 19,
        "percentage": 4
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 417,
        "percentage": 93
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "13.636",
        "ok": "13.636",
        "ko": "-"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}

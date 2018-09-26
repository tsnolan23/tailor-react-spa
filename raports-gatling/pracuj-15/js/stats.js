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
        "total": "1054",
        "ok": "1054",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "18939",
        "ok": "18939",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "9991",
        "ok": "9991",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "5143",
        "ok": "5143",
        "ko": "-"
    },
    "percentiles1": {
        "total": "9983",
        "ok": "9983",
        "ko": "-"
    },
    "percentiles2": {
        "total": "14398",
        "ok": "14398",
        "ko": "-"
    },
    "percentiles3": {
        "total": "18083",
        "ok": "18083",
        "ko": "-"
    },
    "percentiles4": {
        "total": "18833",
        "ok": "18833",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 0,
        "percentage": 0
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 7,
        "percentage": 2
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 443,
        "percentage": 98
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "9.184",
        "ok": "9.184",
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
        "total": "1054",
        "ok": "1054",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "18939",
        "ok": "18939",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "9991",
        "ok": "9991",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "5143",
        "ok": "5143",
        "ko": "-"
    },
    "percentiles1": {
        "total": "9983",
        "ok": "9983",
        "ko": "-"
    },
    "percentiles2": {
        "total": "14398",
        "ok": "14398",
        "ko": "-"
    },
    "percentiles3": {
        "total": "18083",
        "ok": "18083",
        "ko": "-"
    },
    "percentiles4": {
        "total": "18833",
        "ok": "18833",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 0,
        "percentage": 0
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 7,
        "percentage": 2
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 443,
        "percentage": 98
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "9.184",
        "ok": "9.184",
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

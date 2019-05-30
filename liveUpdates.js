
const colors = ['red', 'blue', 'yellow', 'green', 'black'];

let currentDataPoints = [];

var myInterval;

function liveUpdates() {

    function liveUpdates1() {

        var x = document.getElementById("root");
        x.style.display = "none";

        var y = document.getElementById("myModal");
        y.style.display = "none";


        let list = coinIds.join().toUpperCase();


        let url = $.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${list}&tsyms=USD`, function (info) {

           
         let i = 0, data = [];
            for (coin in info) {
                if (!currentDataPoints[coin]) currentDataPoints[coin] = [];
                currentDataPoints[coin].push({ x: new Date(), y: info[coin].USD });
                data.push({
                    type: "line",
                    name: coin,
                    color: colors[i++],
                    showInLegend: true,
                    axisYIndex: 1,
                    dataPoints: currentDataPoints[coin]
                });
            }

            var chart = new CanvasJS.Chart("chartContainer", {
                title: {
                    text: `Value of Coins in $USD`
                },
                axisY: [{
                    title: "Value in $USD",
                    lineColor: "#C24642",
                    tickColor: "#C24642",
                    labelFontColor: "#C24642",
                    titleFontColor: "#C24642",
                    suffix: "USD"
                }],

                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    itemclick: toggleDataSeries
                },
                data: data
            });
            chart.render();

            
        });

        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
          
    
        }

    }

     
    myInterval = setInterval(liveUpdates1, 2000);

}

function clearInterval1() {
    clearInterval(myInterval);
}


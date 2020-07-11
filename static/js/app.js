init();

function init() {
  
    d3.json("samples.json").then((data) => {
      var ids = data.names;
  
      ids.forEach((sample) => {
        d3.select("#selDataset").append("option").text(sample).property("value", sample);
      });
  
      var firstID = ids[0];
      barChart(firstID);
      bubbleChart(firstID);
      metadata(firstID);
    });
  }

  function optionChanged(id) {
    barChart(id);
    bubbleChart(id);
    metadata(id);
  }

  function barChart(id) {
    d3.json("samples.json").then((data) => {

      let sampleData = data.samples.filter(dict => dict.id == id)[0];
  
      var yTicks = sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();

      var trace1 = {
        y: yTicks,
        x: sampleData.sample_values.slice(0, 10).reverse(),
        text: sampleData.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      };

      data = [trace1];
  
      var layout = {
        title: "Top 10 Bacteria Cultures Found",
      };
  
      Plotly.newPlot("bar", data, layout);
    });
  }

  function bubbleChart(id) {
    d3.json("samples.json").then((data) => {

      let sampleData = data.samples.filter(dict => dict.id == id)[0];

      var trace1 = {
        x: sampleData.otu_ids,
        y: sampleData.sample_values,
        text: sampleData.otu_labels,
        mode: "markers",
        marker: {
          size: sampleData.sample_values,
          color: sampleData.otu_ids,
        }
      };

      data = [trace1];
  
      var layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: { title: "OTU ID" },
      };
  
      Plotly.newPlot("bubble", data, layout);
    });
  }

  function metadata(id) {
    d3.json("samples.json").then((data) => {

      let metadata = data.metadata.filter(dict => dict.id == id)[0];

      d3.select("#sample-metadata").html("");
  
      Object.entries(metadata).forEach(([key, value]) => {
        d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
      });
    });
  }
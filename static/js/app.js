function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
var data;
var sample_meta= `/metadata/${sample}`
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(sample_meta).then(function(response) {

  
    // Use d3 to select the panel with id of `#sample-metadata`
      data=Object.entries(response)
      selector=d3.select("#sample-metadata")
      selector.html("")
      selector.append('br')
      data.forEach(function([key, value]) {
                        selector.append('p')
                                .text(`${key}: ${value}`)})
      }
      )};
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(response) {
    // @TODO: Build a Bubble Chart using the sample data
    console.log(response)
    var trace1 = {
      x: response.otu_ids,
      y: response.sample_values,
      mode: 'markers',
      marker: {
        size: response.sample_values
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data, layout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
})}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
444
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

function change_filter() {
  $.ajax({
    type: "POST",
    url: `http://127.0.0.1:5000/filter`,
    data: JSON.stringify({
      zeros: zerosCoordinates,
      poles: polesCoordinates,
      a_coeff: a_coef,
    }),
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (res) {
      var graph1Trace = {
        x: res.magnitude.x,
        y: res.magnitude.y,
        marker: { color: "#00051e" },
        mode: "lines",
      };
      var graph2Trace = {
        x: res.phase.x,
        y: res.phase.y,
        marker: { color: "#00051e" },
        mode: "lines",
      };
      layout = {
        xaxis: {
          tickvals: [0.25, 0.5, 0.75, 1],
          ticktext: ["PI/4", "PI/2", "3PI/4", "PI"],
        },
        yaxis: {
          ticksuffix: `&nbsp; db`,
        },
      };

      Plotly.newPlot(
        "fig-mag",
        [graph1Trace],
        get_middle_layout("Magnitude Response"),
        layout
      );
      Plotly.newPlot(
        "fig-phase",
        [graph2Trace],
        get_middle_layout("Phase Response"),
        layout
      );
      Plotly.newPlot("original-phase", [graph2Trace], layout);
    },
  });
}
function preview_filter() {
  $.ajax({
    type: "POST",
    url: `http://127.0.0.1:5000/preview_a`,
    data: JSON.stringify({
      a_prev: a_preview,
    }),
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (res) {
      var graph1Trace = {
        x: res.x,
        y: res.y,
        marker: { color: "#00051e" },
        mode: "lines",
      };

      Plotly.newPlot("preview-phase", [graph1Trace]);
    },
  });
}

function get_middle_layout(title) {
  return {
    title: {
      text: title,
      font: {
        family: "Roboto",
        size: 20,
      },
    },
    xaxis: {
      tickvals: [0.25, 0.5, 0.75, 1],
      ticktext: ["PI/4", "PI/2", "3PI/4", "PI"],
    },
    yaxis: {
      ticksuffix: `&nbsp; db`,
    },
  };
}

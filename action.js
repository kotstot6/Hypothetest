


var num_populations;
var population_1;
var population_2;
var quantity;
var someone;
var statistic;
var branch;
var alpha;
var knows_variance;
var pop_v1;
var pop_v2;

var test;

var samp_n1;
var samp_n2;
var samp_s2_1;
var samp_s2_2;
var df1;
var df2;
var samp_x1;
var samp_x2;
var samp_p1;
var samp_p2;

var variance_equality;





//window.onload = init;


function fData(df1,df2,f0)
{
  var l = Math.min(0,f0 - 0.1);
  var u = Math.max(4,f0 + 0.1);

  var norm = [];

  for (var i = 0; i < 1000; i++)
  {
    var x = l + u * (i / 1000);
    var y = jStat.centralF.pdf(x,df1,df2);
    norm[i] = [x,y];
  }

  return norm;

}

function tData(df,t0)
{
  var l = Math.min(-3.5,t0 - 0.1);
  var u = Math.max(3.5,t0 + 0.1);

  var norm = [];

  for (var i = 0; i < 1000; i++)
  {
    var x = l + (u - l) * (i / 1000);
    var y = jStat.studentt.pdf(x,df);
    norm[i] = [x,y];
  }

  return norm;

}

function zData(z0)
{
  var l = Math.min(-3,z0 - 0.1);
  var u = Math.max(3,z0 + 0.1);

  var norm = [];

  for (var i = 0; i < 1000; i++)
  {
    var x = l + (u - l) * (i / 1000);
    var y = jStat.normal.pdf(x,0,1);
    norm[i] = [x,y];
  }

  return norm;
}

function makeChart(norm,conf, confX, confY, stat, statX,lower,upper)
{

  var options = {

    title: {
      text: '',
  },

      xAxis: {
        gridLineColor: 'transparent',
        lineColor: 'black',
        title: '',
      },
      yAxis: {
          gridLineColor: 'transparent',

          labels : {
            enabled: false
          },
          title: ''
        },
      chart: {
          renderTo: 'container',
          type: 'area',
          backgroundColor: 'rgb(230,230,230)'
      },
      series: [{
          name: 'Data',
          color: 'black',
          lineWidth: 1.5,
          data: norm,
          showInLegend: false,
      }],

      annotations: [{
        labelOptions: {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            style: {
                color: 'black',
                fontSize: '20px'
            }
        },
        labels: [{
            point: { x: confX, y: confY, xAxis: 0, yAxis: 0 },
            text: conf + "%"
        }]
      },

      {
        labelOptions: {
            borderColor: 'black',
            backgroundColor: 'rgb(230,230,230)',
            style: {
                color: 'black',
                fontSize: '20px'
            }
        },
        labels: [{
            point: { x: statX, y: 0, xAxis: 0, yAxis: 0 },
            useHTML: true,
            text: stat
        }]
      }


    ],

      plotOptions: {
        area: {
          fillColor : 'transparent',
          enableMouseTracking: false,
          color: 'rgb(226, 119, 122)',
          fillColor: 'rgba(0,0,0,0.1)',
          zoneAxis: 'x',
          zones: [{
          //fillColor gets the inside of the graph, color would change the lines
          fillColor: 'transparent',
          // everything below this value has this style applied to it
          value: lower,
        },{
          value: upper,
        },{
          fillColor: 'transparent',
        }]
        }
      }
  };

  var chart = new Highcharts.Chart(options);


}



function advance(q,a,qnext)
{
  q.getElementsByClassName("alert")[0].style.display = "none";
  q.style.display = "none";
  a.style.display = "initial";
  qnext.style.display = "initial";
}

function advance_2(q,qnext)
{
  q.getElementsByTagName("form")[0].style.display = "none";
  qnext.style.display = "initial";
}

function retreat(q,a,qprev)
{
  q.style.display = "none";
  a.style.display = "none";
  qprev.style.display = "initial";
}

function retreat_2(q,qprev)
{
  qprev.getElementsByTagName("form")[0].style.display = "initial";
  q.style.display = "none";
}

function alert(q)
{
  q.getElementsByClassName("alert")[0].style.display = "initial";
}

function fillparams(a,s)
{
  var params = a.getElementsByClassName("param");

  for (var i = 0; i < s.length; i++)
  {
    params[i].innerHTML = s[i];
  }
}


function intro_pop()
{

  var q = document.getElementById("intro_pop_q");
  var a = document.getElementById("intro_pop_a");
  var qnext;

  var pops = document.getElementById("pops");


  if (pops.value == "select")
  {
    alert(q);
  }
  else if (pops.value == "two")
  {
    num_populations = "Two!";
    fillparams(a,[num_populations]);
    qnext = document.getElementById("pop_names_q");
    advance(q,a,qnext);
  }
  else if (pops.value = "one")
  {
    num_populations = "One!";
    fillparams(a,[num_populations]);
    //qnext = document.getElementById("pop_name_quantity_q");
    qnext = document.getElementById("not_ready");
    advance(q,a,qnext);
  }

}

function not_ready()
{
  var q = document.getElementById("not_ready");
  var qprev = document.getElementById("intro_pop_q");
  var a = document.getElementById("intro_pop_a");

  retreat(q,a,qprev);
}

function pop_names_back()
{
  var q = document.getElementById("pop_names_q");
  var qprev = document.getElementById("intro_pop_q");
  var a = document.getElementById("intro_pop_a");

  retreat(q,a,qprev);
}

function pop_names()
{
  var q = document.getElementById("pop_names_q");
  var a = document.getElementById("pop_names_a");
  var qnext = document.getElementById("quantity_q");
  var inputs = q.getElementsByTagName("input");

  if (inputs[0].value == "" || inputs[1].value == "")
  {
    alert(q);
  }
  else
  {
    population_1 = inputs[0].value;
    population_2 = inputs[1].value;

    fillparams(a,[population_1,population_2]);

    advance(q,a,qnext);
  }
}

function quantity_back()
{
  var q = document.getElementById("quantity_q");
  var qprev = document.getElementById("pop_names_q");
  var a = document.getElementById("pop_names_a");

  retreat(q,a,qprev);
}

function quantity_adv()
{
  var q = document.getElementById("quantity_q");
  var a = document.getElementById("quantity_a");
  var qnext = document.getElementById("someone_statistic_q");
  var inputs = q.getElementsByTagName("input");

  if (inputs[0].value == "")
  {
    alert(q);
  }
  else
  {
    quantity = inputs[0].value;

    fillparams(a,[quantity]);

    fillparams(qnext,[quantity,"each population"]);

    advance(q,a,qnext);
  }
}

function pop_name_quantity_back()
{
  var q = document.getElementById("pop_name_quantity_q");
  var qprev = document.getElementById("intro_pop_q");
  var a = document.getElementById("intro_pop_a");

  retreat(q,a,qprev);
}

function pop_name_quantity()
{
  var q = document.getElementById("pop_name_quantity_q");
  var a = document.getElementById("pop_name_quantity_a");
  var qnext = document.getElementById("someone_statistic_q");
  var inputs = q.getElementsByTagName("input");

  if (inputs[0].value == "" || inputs[1].value == "")
  {
    alert(q);
  }
  else
  {
    population_1 = inputs[0].value;
    quantity = inputs[1].value;

    fillparams(a,[population_1,quantity]);

    fillparams(qnext,[quantity,population_1]);

    advance(q,a,qnext);
  }
}


function someone_statistic_back()
{
  var q = document.getElementById("someone_statistic_q");
  var qprev;
  var a;

  if (num_populations == "Two!")
  {
    qprev = document.getElementById("quantity_q");
    a = document.getElementById("quantity_a");
  }
  else
  {
    qprev = document.getElementById("pop_name_quantity_q");
    a = document.getElementById("pop_name_quantity_a");
  }

  retreat(q,a,qprev);
}

function someone_statistic()
{
  var q = document.getElementById("someone_statistic_q");
  var a = document.getElementById("someone_statistic_a");
  var qnext = document.getElementById("gather_evidence_q");
  var inputs = q.getElementsByTagName("input");

  var stat = document.getElementById("stat");

  if (inputs[0].value == "" || stat.value == "select")
  {
    alert(q);
  }
  else
  {
    someone = inputs[0].value;
    statistic = stat.value;

    var pop_filler = (num_populations == "Two!") ? "each population" : population_1;

    fillparams(a,[someone, quantity, pop_filler, statistic]);

    if (num_populations == "Two!")
    {
      var params = get_params_gather();

      fillparams(qnext,params);

      advance(q,a,qnext);
    }


  }
}

function get_params_gather()
{
  var params = [];

  params[0] = someone;
  params[3] = someone;

  if (statistic == "mean")
  {
    params[1] = "means of each population are";
    params[2] = "each other";
    params[4] = "the mean quantity of " + quantity + " in " + population_1;
    params[5] = "that of " + population_2;
  }
  else if (statistic == "variance" )
  {
    params[1] = "variances of each population are";
    params[2] = "each other";
    params[4] = "the variance of " + quantity + " in " + population_1;
    params[5] = "that of " + population_2;
  }
  else if (statistic == "proportion")
  {
    params[1] = "proportions of " + quantity + " in each population are";
    params[2] = "each other";
    params[4] = "the proportion of " + quantity + " in " + population_1;
    params[5] = "that of " + population_2;
  }
  else
  {
    params[1] = "mean difference in paired quantities of " + quantity + " is";
    params[2] = "zero";
    params[4] = "this mean";
    params[5] = "zero";
  }

  return params;
}


function gather_evidence_back()
{
  var q = document.getElementById("gather_evidence_q");
  var qprev = document.getElementById("someone_statistic_q");
  var a = document.getElementById("someone_statistic_a");

  retreat(q,a,qprev);
}

function gather_evidence()
{
  var q = document.getElementById("gather_evidence_q");
  var a = document.getElementById("gather_evidence_a");
  var qnext;
  var inputs = q.getElementsByTagName("input");

  var eq = document.getElementById("eq");

  var alph = parseFloat(inputs[0].value);

  if (isNaN(alph) || alph >= 1 || alph <= 0 || eq.value == "select")
  {
    alert(q);
  }
  else
  {
    branch = eq.value;
    alpha = alph;

    var params = get_params_gather();

    fillparams(a,[params[0],params[1],params[2],params[3],params[4],branch,params[5],alpha]);

    if (statistic == "mean")
    {
      qnext = document.getElementById("know_variance_q");
      fillparams(qnext,[someone]);
    }
    else if (statistic == "variance")
    {
      qnext = document.getElementById("get_samples_f_q");
      fillparams(qnext,[someone,population_1,population_2,someone,quantity,population_1,quantity,population_2]);
    }
    else if (statistic == "proportion")
    {
      qnext = document.getElementById("get_samples_p2_q");
      fillparams(qnext,[someone,population_1,population_2,someone,quantity,population_1,quantity,population_2]);
    }
    else
    {
      qnext = document.getElementById("get_samples_pt_q");
      fillparams(qnext,[someone,population_1,population_2]);
    }

    advance(q,a,qnext);
  }
}

function know_variance_back()
{
  var q = document.getElementById("know_variance_q");
  var qprev = document.getElementById("gather_evidence_q");
  var a = document.getElementById("gather_evidence_a");

  retreat(q,a,qprev);
}

function know_variance()
{
  var q = document.getElementById("know_variance_q");
  var a = document.getElementById("know_variance_a");
  var qnext;
  var inputs = q.getElementsByTagName("input");

  var know = document.getElementById("know");

  if (know.value == "select")
  {
    alert(q);
  }
  else if (know.value == "does")
  {
    knows_variance = know.value;

    qnext = document.getElementById("get_variance_q");
    fillparams(a,[someone,knows_variance]);
    advance(q,a,qnext);
  }
  else
  {
    knows_variance = know.value;

    qnext = document.getElementById("get_samples_t2_q");
    fillparams(a,[someone,knows_variance]);
    fillparams(qnext,[someone,population_1,population_2,population_1,someone,quantity,quantity,population_2,someone,quantity,quantity]);
    advance(q,a,qnext);
  }
}



function get_variance_back()
{
  var q = document.getElementById("get_variance_q");
  var qprev = document.getElementById("know_variance_q");
  var a = document.getElementById("know_variance_a");

  retreat(q,a,qprev);
}

function get_variance()
{
  var q = document.getElementById("get_variance_q");
  var a = document.getElementById("get_variance_a");
  var qnext = document.getElementById("get_samples_z2_q");
  var inputs = q.getElementsByTagName("input");

  var v1 = parseFloat(inputs[0].value);
  var v2 = parseFloat(inputs[1].value);

  if (isNaN(v1) || v1 < 0 || isNaN(v2) || v2 < 0)
  {
    alert(q);
  }
  else
  {
    pop_v1 = v1;
    pop_v2 = v2;

    fillparams(a,[pop_v1,pop_v2]);

    fillparams(qnext,[someone,population_1,population_2,someone,population_1,population_2]);

    advance(q,a,qnext);
  }
}


function assume_equality_back()
{
  var q = document.getElementById("assume_equality_q");
  var qprev = document.getElementById("get_samples_t2_q");
  var a = document.getElementById("get_samples_t2_a");

  retreat(q,a,qprev);
}

function assume_equality()
{
  var q = document.getElementById("assume_equality_q");
  var a = document.getElementById("assume_equality_a");
  var qnext;
  var inputs = q.getElementsByTagName("input");

  var assump = document.getElementById("assump");

  if (assump.value == "select")
  {
    alert(q);
  }
  else if (assump.value == "can assume inequality")
  {
    variance_equality = assump.value;

    qnext = document.getElementById("null_alt");
    fillparams(a,[variance_equality]);

    test = "t2u";

    perform_test();

    advance(q,a,qnext);
  }
  else if (assump.value == "can assume equality")
  {
    variance_equality = assump.value;

    qnext = document.getElementById("null_alt");
    fillparams(a,[variance_equality]);

    test = "t2p";

    perform_test();

    advance(q,a,qnext);
  }
  else
  {
    document.getElementById("doub").innerHTML = "first ";
    double_test = true;
    variance_equality = assump.value;
    fillparams(a,[variance_equality]);
    qnext = document.getElementById("null_alt");
    document.getElementById("test_equality").style.display = "initial";
    perform_f_test();
    advance(q,a,qnext);
  }

}


function equality_result_back()
{
  var q = document.getElementById("equality_result");
  var qprev = document.getElementById("assume_equality_q");
  var a = document.getElementById("assume_equality_a");
  document.getElementById("test_equality").style.display = "none";
  retreat(q,a,qprev);
}
function equality_result()
{
  var q = document.getElementById("equality_result");
  var qnext = document.getElementById("null_alt");
  advance_2(q,qnext);
}


function get_samples_t2_back()
{
  var q = document.getElementById("get_samples_t2_q");
  var qprev = document.getElementById("know_variance_q");
  var a = document.getElementById("know_variance_a");

  retreat(q,a,qprev);
}

function get_samples_t2()
{
  var q = document.getElementById("get_samples_t2_q");
  var a = document.getElementById("get_samples_t2_a");
  var qnext = document.getElementById("assume_equality_q");
  var inputs = q.getElementsByTagName("input");

  var n1 = parseInt(inputs[0].value);
  var n2 = parseInt(inputs[1].value);
  var x1 = parseFloat(inputs[2].value);
  var s2_1 = parseFloat(inputs[3].value);
  var x2 = parseFloat(inputs[4].value);
  var s2_2 = parseFloat(inputs[5].value);

  if (isNaN(n1) || n1 <= 0 || isNaN(n2) || n2 <= 0 || isNaN(x1) || isNaN(x2) || isNaN(s2_1) || s2_1 < 0 || isNaN(s2_2) || s2_2 < 0)
  {
    alert(q);
  }
  else
  {
    samp_n1 = n1;
    samp_n2 = n2;
    samp_x1 = x1;
    samp_x2 = x2;
    samp_s2_1 = s2_1;
    samp_s2_2 = s2_2;

    fillparams(a,[someone,population_1,samp_n1,population_2,samp_n2,population_1,someone,quantity,samp_x1,quantity,samp_s2_1,population_2,someone,quantity,samp_x2,quantity,samp_s2_2]);

    advance(q,a,qnext);
  }
}


function get_samples_z2_back()
{
  var q = document.getElementById("get_samples_z2_q");
  var qprev = document.getElementById("get_variance_q");
  var a = document.getElementById("get_variance_a");

  retreat(q,a,qprev);
}

function get_samples_z2()
{
  var q = document.getElementById("get_samples_z2_q");
  var a = document.getElementById("get_samples_z2_a");
  var qnext = document.getElementById("null_alt");
  var inputs = q.getElementsByTagName("input");

  var n1 = parseInt(inputs[0].value);
  var n2 = parseInt(inputs[1].value);
  var x1 = parseFloat(inputs[2].value);
  var x2 = parseFloat(inputs[3].value);

  if (isNaN(n1) || n1 <= 0 || isNaN(n2) || n2 <= 0 || isNaN(x1) || isNaN(x2))
  {
    alert(q);
  }
  else
  {
    samp_n1 = n1;
    samp_n2 = n2;
    samp_x1 = x1;
    samp_x2 = x2;

    fillparams(a,[someone,population_1,samp_n1,population_2,samp_n2,someone,population_1,samp_x1,population_2,samp_x2]);

    test = "z2";

    perform_test();

    advance(q,a,qnext);
  }
}




function get_samples_f_back()
{
  var q = document.getElementById("get_samples_f_q");
  var qprev = document.getElementById("gather_evidence_q");
  var a = document.getElementById("gather_evidence_a");

  retreat(q,a,qprev);
}

function get_samples_f()
{
  var q = document.getElementById("get_samples_f_q");
  var a = document.getElementById("get_samples_f_a");
  var qnext = document.getElementById("null_alt");
  var inputs = q.getElementsByTagName("input");

  var n1 = parseInt(inputs[0].value);
  var n2 = parseInt(inputs[1].value);
  var s2_1 = parseFloat(inputs[2].value);
  var s2_2 = parseFloat(inputs[3].value);

  if (isNaN(n1) || n1 <= 0 || isNaN(n2) || n2 <= 0 || isNaN(s2_1) || s2_1 < 0 || isNaN(s2_2) || s2_2 < 0)
  {
    alert(q);
  }
  else
  {
    samp_n1 = n1;
    samp_n2 = n2;
    samp_s2_1 = s2_1;
    samp_s2_2 = s2_2;

    fillparams(a,[someone,population_1,samp_n1,population_2,samp_n2,someone,quantity,population_1,samp_s2_1,quantity,population_2,samp_s2_2]);

    test = "f";

    perform_test();

    advance(q,a,qnext);
  }
}

function get_samples_p2_back()
{
  var q = document.getElementById("get_samples_p2_q");
  var qprev = document.getElementById("gather_evidence_q");
  var a = document.getElementById("gather_evidence_a");

  retreat(q,a,qprev);
}

function get_samples_p2()
{
  var q = document.getElementById("get_samples_p2_q");
  var a = document.getElementById("get_samples_p2_a");
  var qnext = document.getElementById("null_alt");
  var inputs = q.getElementsByTagName("input");

  var n1 = parseInt(inputs[0].value);
  var n2 = parseInt(inputs[1].value);
  var p1 = parseFloat(inputs[2].value);
  var p2 = parseFloat(inputs[3].value);

  if (isNaN(n1) || n1 <= 0 || isNaN(n2) || n2 <= 0 || isNaN(p1) || p1 < 0 || p1 > 1 || isNaN(p2) || p2 < 0 || p2 > 1)
  {
    alert(q);
  }
  else
  {
    samp_n1 = n1;
    samp_n2 = n2;
    samp_p1 = p1;
    samp_p2 = p2;

    fillparams(a,[someone,population_1,samp_n1,population_2,samp_n2,someone,quantity,population_1,samp_p1,quantity,population_2,samp_p2]);

    test = "p2";

    perform_test();

    advance(q,a,qnext);
  }
}



function get_samples_pt_back()
{
  var q = document.getElementById("get_samples_pt_q");
  var qprev = document.getElementById("gather_evidence_q");
  var a = document.getElementById("gather_evidence_a");

  retreat(q,a,qprev);
}

function get_samples_pt()
{
  var q = document.getElementById("get_samples_pt_q");
  var a = document.getElementById("get_samples_pt_a");
  var qnext = document.getElementById("null_alt");
  var inputs = q.getElementsByTagName("input");

  var n = parseInt(inputs[0].value);
  var d = parseFloat(inputs[1].value);
  var sd = parseFloat(inputs[2].value);

  if (isNaN(n) || n <= 0 || isNaN(d) || isNaN(sd) || sd < 0)
  {
    alert(q);
  }
  else
  {
    samp_n = n;
    samp_d = d;
    samp_sd = sd;

    fillparams(a,[someone,samp_n,population_1,population_2,samp_d,samp_sd]);

    test = "pt";

    perform_test();

    advance(q,a,qnext);
  }
}



function null_alt_back()
{
  var q = document.getElementById("null_alt");
  var qprev;
  var a;

  if (test == "f")
  {
    qprev = document.getElementById("get_samples_f_q");
    a = document.getElementById("get_samples_f_a");
    retreat(q,a,qprev);
  }
  else if (test == "z2")
  {
    qprev = document.getElementById("get_samples_z2_q");
    a = document.getElementById("get_samples_z2_a");
    retreat(q,a,qprev);
  }
  else if (test == "p2")
  {
    qprev = document.getElementById("get_samples_p2_q");
    a = document.getElementById("get_samples_p2_a");
    retreat(q,a,qprev);
  }
  else if (test == "pt")
  {
    qprev = document.getElementById("get_samples_pt_q");
    a = document.getElementById("get_samples_pt_a");
    retreat(q,a,qprev);
  }
  else if (test == "t2u" || test == "t2p")
  {
    double_test = false;

    if (double_test)
    {
      qprev = document.getElementById("equality_result");
      retreat_2(q,qprev);
    }
    else
    {
      qprev = document.getElementById("assume_equality_q");
      a = document.getElementById("assume_equality_a");
      retreat(q,a,qprev);
    }
  }
}

function null_alt()
{
  var q = document.getElementById("null_alt");
  var qnext = document.getElementById("can_conclude");
  advance_2(q,qnext);
}

function can_conclude_back()
{
  var q = document.getElementById("can_conclude");
  var qprev = document.getElementById("null_alt");
  retreat_2(q,qprev);
}

function can_conclude()
{
  var q = document.getElementById("can_conclude");
  var qnext = document.getElementById("confidence_insight");
  advance_2(q,qnext);
}

function confidence_insight_back()
{
  var q = document.getElementById("confidence_insight");
  var qprev = document.getElementById("can_conclude");
  retreat_2(q,qprev);
}

function confidence_insight()
{
  var q = document.getElementById("confidence_insight");
  var qnext = document.getElementById("calculate_confidence");
  advance_2(q,qnext);
}

function calculate_confidence_back()
{
  var q = document.getElementById("calculate_confidence");
  var qprev = document.getElementById("confidence_insight");
  retreat_2(q,qprev);
}

function calculate_confidence()
{
  var q = document.getElementById("calculate_confidence");
  var qnext = document.getElementById("confidence_result");
  advance_2(q,qnext);
}

function confidence_result_back()
{
  var q = document.getElementById("confidence_result");
  var qprev = document.getElementById("calculate_confidence");
  retreat_2(q,qprev);
}

function confidence_result()
{
  var q = document.getElementById("confidence_result");
  var qnext = document.getElementById("evaluate_test");
  advance_2(q,qnext);
}

function evaluate_test_back()
{
  var q = document.getElementById("evaluate_test");
  var qprev = document.getElementById("confidence_result");
  retreat_2(q,qprev);
}

function evaluate_test()
{
  var q = document.getElementById("evaluate_test");
  var qnext = document.getElementById("intro_p_value");
  advance_2(q,qnext);
}

function intro_p_value_back()
{
  var q = document.getElementById("intro_p_value");
  var qprev = document.getElementById("evaluate_test");
  retreat_2(q,qprev);
}

function intro_p_value()
{
  var q = document.getElementById("intro_p_value");
  var qnext = document.getElementById("calculate_p");
  advance_2(q,qnext);
}

function calculate_p_back()
{
  var q = document.getElementById("calculate_p");
  var qprev = document.getElementById("intro_p_value");
  retreat_2(q,qprev);
}

function calculate_p()
{
  var q = document.getElementById("calculate_p");
  var qnext = document.getElementById("test_conclusion");
  advance_2(q,qnext);
}

function test_conclusion_back()
{
  var q = document.getElementById("test_conclusion");
  var qprev = document.getElementById("calculate_p");
  retreat_2(q,qprev);
}

function new_test()
{
  document.getElementById("null_alt").style.display = "none";
  document.getElementById("null_alt").getElementsByTagName("form")[0].style.display = "initial";
  document.getElementById("can_conclude").style.display = "none";
  document.getElementById("can_conclude").getElementsByTagName("form")[0].style.display = "initial";
  document.getElementById("confidence_insight").style.display = "none";
  document.getElementById("confidence_insight").getElementsByTagName("form")[0].style.display = "initial";
  document.getElementById("calculate_confidence").style.display = "none";
  document.getElementById("calculate_confidence").getElementsByTagName("form")[0].style.display = "initial";
  document.getElementById("confidence_result").style.display = "none";
  document.getElementById("confidence_result").getElementsByTagName("form")[0].style.display = "initial";
  document.getElementById("evaluate_test").style.display = "none";
  document.getElementById("evaluate_test").getElementsByTagName("form")[0].style.display = "initial";
  document.getElementById("intro_p_value").style.display = "none";
  document.getElementById("intro_p_value").getElementsByTagName("form")[0].style.display = "initial";
  document.getElementById("calculate_p").style.display = "none";
  document.getElementById("calculate_p").getElementsByTagName("form")[0].style.display = "initial";
  document.getElementById("test_conclusion").style.display = "none";

  document.getElementById("end_button").style.display = "none";

  document.getElementById("equality_result").style.display = "initial";
  document.getElementById("equality_result").getElementsByTagName("form")[0].style.display = "initial";

  test = (assume_eq) ? "t2p" : "t2u";

  document.getElementById("doub").innerHTML = "next ";

  perform_test();



}


function perform_test()
{
  if (test == "f")
  {
    perform_f_test()
  }
  else if (test == "z2")
  {
    perform_z2_test();
  }
  else if (test == "p2")
  {
    perform_p2_test();
  }
  else if (test == "pt")
  {
    perform_pt_test();
  }
  else if (test == "t2u")
  {
    perform_t2u_test();
  }
  else if (test == "t2p")
  {
    perform_t2p_test();
  }
}

//F TEST

var double_test = false;
var assume_eq = true;

function perform_f_test()
{
  if (double_test)
  {
    temp_branch = branch;
    branch = "different";
  }


  test_name = "F-Test";
  pop1_unit = "variance of " + quantity + " in " + population_1;
  pop2_unit = "variance of " + quantity + " in " + population_2;
  null_hyp = "$$H_{0} : \\sigma_{1}^{2} = \\sigma_{2}^{2}$$";
  var conf = +(100 * (1 - alpha)).toFixed(3);
  conf_equation = "\\(100(1 - \\alpha) = " + conf + "\\%\\)";
  var br = (branch == "greater") ? ">" : (branch == "less") ? "<" : "\\neq";
  alt_hyp = "$$H_{1} : \\sigma_{1}^{2} " + br + " \\sigma_{2}^{2}$$";

  var a = document.getElementById("null_alt");

  fillparams(a, [test_name,pop1_unit,pop2_unit,null_hyp,conf_equation,pop1_unit,branch,pop2_unit,alt_hyp]);

  assum = "ratio of variances in each population";
  assum_num = "\\(1\\)";
  assum_eq = "\\( \\sigma_{1}^{2}/\\sigma_{2}^{2} = 1 \\)";
  imp_condition = "<br><br>1. Make \\(n_{1} = " + samp_n1 + "\\) observations from \n" + population_1;
  imp_condition += " and \\(n_{2} = " + samp_n2 + "\\) observations from \n" + population_2;
  imp_condition += "<br><br>2. Treat the observed sample variances \\(s_{1}^{2},s_{2}^{2}\\)\n";
  imp_condition += " as random variables \\(S_{1}^{2},S_{2}^{2}\\) (i.e. we can observe these\n";
  imp_condition += " to be ANY realistic value, and the following conclusion will hold)<br><br>\n";
  imp_condition += "3. Define another random variable \\(F_{0}\\), called the test statistic, to be";
  test_stat_eq = "$$F_{0} = \\frac{S_{1}^{2}}{S_{2}^{2}}$$";
  test_stat = "\\(F_{0}\\)";
  df1 = samp_n1 - 1;
  df2 = samp_n2 - 1;
  pdf = "F distribution with \\(n_{1} - 1 = " + df1 + "\\) and \\(n_{2} - 1 = " + df2 + "\\)";
  pdf += " degrees of freedom";
  pdf_denote = "\\(F_{0} \\sim F(" + df1 + "," + df2 + ")\\)";
  a = document.getElementById("can_conclude");

  fillparams(a,[assum,assum_num,assum_eq,imp_condition,test_stat_eq,test_stat,pdf,pdf_denote]);

  var s2_1 = +(samp_s2_1).toFixed(3);
  var s2_2 = +(samp_s2_2).toFixed(3);
  samp_f0 = samp_s2_1 / samp_s2_2;
  var f0 = +(samp_f0).toFixed(3);

  var alph = +(alpha).toFixed(3);
  alph_eq = "\\(\\alpha = " + alph + "\\)";
  pdf_func = "\\(F(" + df1 + "," + df2 + ")\\)";
  conf_info = conf + "% ";

  if (branch == "different")
  {
    tailed = "two-tailed";
    conf_info += tailed;
    conf_int = "\\([L,U]\\)";
    conf_vals = "\\(L\\) and \\(U\\)"
    conf_desc = "fall between the values " + conf_vals;
    calc_conf_eq = "$$L = \\text{invF}(\\alpha/2," + df1 + "," + df2 + ")$$\n";
    calc_conf_eq += "$$U = \\text{invF}(1 - \\alpha/2," + df1 + "," + df2 + ")$$\n";
    lower = jStat.centralF.inv(alpha/2,df1,df2);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invF}(" + alph + "/2," + df1 + "," + df2 + ") = " + l_result + "$$\n";
    upper = jStat.centralF.inv(1 - alpha/2,df1,df2);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied += "$$U = \\text{invF}(1 - " + alph + "/2," + df1 + "," + df2 + ") = " + u_result + "$$\n";
    conf_desc_applied = "fall between " + l_result + " and " + u_result;
    p_val_eq = "$$p = 2 \\times \\min[\\text{Fcdf}(f_{0},\\infty," + df1 + "," + df2 + "),\\text{Fcdf}(0,f_{0}," + df1 + "," + df2 + ")]$$";
    samp_p_val = 2 * Math.min(1 - jStat.centralF.cdf(samp_f0,df1,df2), jStat.centralF.cdf(samp_f0,df1,df2));
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align} p = & \\text{ } 2 \\times \\min[\\text{Fcdf}(" + f0 + ",\\infty," + df1 + "," + df2 + "),\\text{Fcdf}(0," + f0 + "," + df1 + "," + df2 + ")] \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " and " + population_2 + " produce different variances in quantities of " + quantity;
  }
  else if (branch == "greater")
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\((-\\infty,U]\\)";
    conf_vals = "\\(U\\)";
    conf_desc = "be less than (or equal to) " + conf_vals;
    calc_conf_eq = "$$U = \\text{invF}(1 - \\alpha," + df1 + "," + df2 + ")$$\n";
    upper = jStat.centralF.inv(1 - alpha,df1,df2);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied = "$$U = \\text{invF}(1 - " + alph + "," + df1 + "," + df2 + ") = " + u_result + "$$\n";
    conf_desc_applied = "be less than (or equal to) " + u_result;
    p_val_eq = "$$p = \\text{Fcdf}(f_{0},\\infty," + df1 + "," + df2 + ")$$";
    samp_p_val = 1 - jStat.centralF.cdf(samp_f0,df1,df2);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } \\text{Fcdf}(" + f0 + ",\\infty," + df1 + "," + df2 + ") \\\\\\\\ = \\text{ } & " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a larger variance in quantity of " + quantity + " than do(es) " + population_2;
  }
  else
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\([L,\\infty)\\)";
    conf_vals = "\\(L\\)";
    conf_desc = "be greater than (or equal to) " + conf_vals;
    calc_conf_eq = "$$L = \\text{invF}(\\alpha," + df1 + "," + df2 + ")$$\n";
    lower = jStat.centralF.inv(alpha,df1,df2);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invF}(" + alph + "," + df1 + "," + df2 + ") = " + l_result + "$$\n";
    conf_desc_applied = "be greater than (or equal to) " + l_result;
    p_val_eq = "$$p = \\text{Fcdf}(0,f_{0}," + df1 + "," + df2 + ")$$";
    samp_p_val = jStat.centralF.cdf(samp_f0,df1,df2);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } \\text{Fcdf}(0," + f0 + "," + df1 + "," + df2 + ") \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a smaller variance in quantity of " + quantity + " than do(es) " + population_2;
  }

  a = document.getElementById("confidence_insight");

  fillparams(a, [pdf_denote,conf_info,conf_int,test_stat,conf,conf_desc,conf_vals]);

  a = document.getElementById("calculate_confidence");

  fillparams(a,[tailed,pdf_func,calc_conf_eq,alph_eq,calc_conf_applied]);

  stats_list = "$$n_{1} = " + samp_n1 + "$$\n$$n_{2} = " + samp_n2 + "$$\n$$s_{1}^{2} = " + s2_1 + "$$\n$$s_{2}^{2} = " + s2_2 + "$$";

  test_stat_applied = "$$\\begin{align} f_{0} = &\\text{ } \\frac{s_{1}^{2}}{s_{2}^{2}} \\\\\\\\ = &\\text{ } \\frac{" + s2_1 + "}{" + s2_2 + "} \\\\\\\\ = &\\text{ } " + f0 + "\\end{align}$$";

  a = document.getElementById("confidence_result");

  fillparams(a,[conf,conf_desc_applied,conf,someone,someone,stats_list,test_stat_applied]);

  observed_ts = "\\(f_{0}\\)";

  var passed = (branch == "different") ? (samp_f0 >= lower && samp_f0 <= upper) : (branch == "less") ? (samp_f0 >= lower) : (samp_f0 <= upper);

  if (passed)
  {
    ts_place = "<b>inside</b>";
    ts_remark = "confirming our " + conf + "% confidence that it would do so!";
    ts_conclusion = "The observation behaved as expected from our original assumption,\n so we cannot arrive at a contradiction.";
    ts_conclusion += " Therefore, we fail to reject the null hypothesis.";
  }
  else
  {
    ts_place = "<b>outside</b> of";
    ts_remark = "even though we were " + conf + "% sure it would've fallen <b>inside</b>!";
    ts_conclusion = "This is the contradiction we were looking for to reject our null hypothesis!";
  }

  a = document.getElementById("evaluate_test");

  fillparams(a,[observed_ts,ts_place,ts_remark,ts_conclusion]);

  if (samp_p_val < alpha)
  {
    p_conclusion = "Since \\(p < \\alpha = " + alph + "\\), we reject the null, as expected.";
    evidence_amt = "sufficient";
    evidence_amt_2 = "found enough";
    assume_eq = false;
  }
  else
  {
    p_conclusion = "Since \\(p \\geq \\alpha = " + alph + "\\), we cannot reject the null, as expected.";
    evidence_amt = "insufficient";
    evidence_amt_2 = "did not find enough";
    assume_eq = true;
  }

  a = document.getElementById("calculate_p");

  fillparams(a,[p_val_eq,p_val_applied,p_conclusion]);


  a = document.getElementById("test_conclusion");

  fillparams(a,[someone,evidence_amt,alt_desc,null_hyp,evidence_amt_2,alt_hyp]);

  data = fData(df1,df2,samp_f0);
  lChart = (branch == "greater") ? 0 : lower;
  uChart = (branch == "less") ? Math.max(4,samp_f0 + 0.1) : upper;
  makeChart(data,conf, 1, jStat.centralF.pdf(1,df1,df2) / 2, "f<sub>0</sub>", samp_f0,lChart,uChart);

  if (double_test)
  {
    branch = temp_branch;
    document.getElementById("end_button").style.display = "initial";
    a = document.getElementById("equality_result");
    if (assume_eq)
    {
      fillparams(a,["failed to find","\\(\\sigma_{1} = \\sigma_{2} \\)", "pooled"]);
    }
    else
    {
      fillparams(a,["found","\\(\\sigma_{1} \\neq \\sigma_{2} \\)", "unpooled"]);
    }
  }

  MathJax.typeset();


}


//TWO SAMPLE Z TEST


function perform_z2_test()
{
  test_name = "Two Sample Z-Test";
  pop1_unit = "mean quantity of " + quantity + " in " + population_1;
  pop2_unit = "mean quantity of " + quantity + " in " + population_2;
  null_hyp = "$$H_{0} : \\mu_{1} = \\mu_{2}$$";
  var conf = +(100 * (1 - alpha)).toFixed(3);
  conf_equation = "\\(100(1 - \\alpha) = " + conf + "\\%\\)";
  var br = (branch == "greater") ? ">" : (branch == "less") ? "<" : "\\neq";
  alt_hyp = "$$H_{1} : \\mu_{1} " + br + " \\mu_{2}$$";

  var a = document.getElementById("null_alt");

  fillparams(a, [test_name,pop1_unit,pop2_unit,null_hyp,conf_equation,pop1_unit,branch,pop2_unit,alt_hyp]);

  assum = "difference in mean of each population";
  assum_num = "\\(0\\)";
  assum_eq = "\\( \\mu_{1} - \\mu_{2} = 0 \\)";
  imp_condition = "treat the previously-defined statistics \\(\\overline{x}_{1},\\overline{x}_{2},n_{1},n_{2}\\)\n";
  imp_condition += " as random variables \\(\\overline{X}_{1},\\overline{X}_{2},N_{1},N_{2}\\) (i.e. we can observe these";
  imp_condition += " to be ANY realistic value, and the following conclusion will hold), and";
  imp_condition += " define another random variable \\(Z_{0}\\), called the test statistic, to be";
  test_stat_eq = "$$Z_{0} = \\frac{\\overline{X}_{1} - \\overline{X}_{2}}{\\sqrt{\\frac{\\sigma_{1}^{2}}{N_{1}} + \\frac{\\sigma_{2}^{2}}{N_{2}}}}$$";
  test_stat = "\\(Z_{0}\\)";
  pdf = "standard normal distribution";
  pdf_denote = "\\(Z_{0} \\sim N(0,1)\\)";

  a = document.getElementById("can_conclude");

  fillparams(a,[assum,assum_num,assum_eq,imp_condition,test_stat_eq,test_stat,pdf,pdf_denote]);

  var x1 = +(samp_x1).toFixed(3);
  var x2 = +(samp_x2).toFixed(3);
  samp_z0 = (samp_x1 - samp_x2) / Math.sqrt((pop_v1 / samp_n1) + (pop_v2 / samp_n2));
  var z0 = +(samp_z0).toFixed(3);

  var alph = +(alpha).toFixed(3);
  alph_eq = "\\(\\alpha = " + alph + "\\)";
  pdf_func = "\\(N(0,1)\\)";
  conf_info = conf + "% ";

  if (branch == "different")
  {
    tailed = "two-tailed";
    conf_info += tailed;
    conf_int = "\\([L,U]\\)";
    conf_vals = "\\(L\\) and \\(U\\)"
    conf_desc = "fall between the values " + conf_vals;
    calc_conf_eq = "$$L = \\text{invNorm}(\\alpha/2,0,1)$$\n";
    calc_conf_eq += "$$U = \\text{invNorm}(1 - \\alpha/2,0,1)$$\n";
    lower = jStat.normal.inv(alpha/2,0,1);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invNorm}(" + alph + "/2,0,1) = " + l_result + "$$\n";
    upper = jStat.normal.inv(1 - alpha/2,0,1);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied += "$$U = \\text{invNorm}(1 - " + alph + "/2,0,1) = " + u_result + "$$\n";
    conf_desc_applied = "fall between " + l_result + " and " + u_result;
    p_val_eq = "$$p = 2(1 - \\phi(|z_{0}|))$$<br>Where \\(\\phi(|z_{0}|) = \\text{normalcdf}(|z_{0}|,0,1)\\).";
    samp_p_val = 2 * (1 - jStat.normal.cdf(Math.abs(samp_z0),0,1));
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align} p = & \\text{ } 2(1 - \\phi(|" + z0 + "|)) \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " and " + population_2 + " produce different mean quantities of " + quantity;
  }
  else if (branch == "greater")
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\((-\\infty,U]\\)";
    conf_vals = "\\(U\\)";
    conf_desc = "be less than (or equal to) " + conf_vals;
    calc_conf_eq = "$$U = \\text{invNorm}(1 - \\alpha,0,1)$$\n";
    upper = jStat.normal.inv(1 - alpha,0,1);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied = "$$U = \\text{invNorm}(1 - " + alph + ",0,1) = " + u_result + "$$\n";
    conf_desc_applied = "be less than (or equal to) " + u_result;
    p_val_eq = "$$p = 1 - \\phi(z_{0})$$<br>Where \\(\\phi(z_{0}) = \\text{normalcdf}(z_{0},0,1)\\).";
    samp_p_val = 1 - jStat.normal.cdf(samp_z0,0,1);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } 1 - \\phi(" + z0 + ") \\\\\\\\ = \\text{ } & " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a larger mean quantity of " + quantity + " than do(es) " + population_2;
  }
  else
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\([L,\\infty)\\)";
    conf_vals = "\\(L\\)";
    conf_desc = "be greater than (or equal to) " + conf_vals;
    calc_conf_eq = "$$L = \\text{invNorm}(\\alpha,0,1)$$\n";
    lower = jStat.normal.inv(alpha,0,1);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invNorm}(" + alph + ",0,1) = " + l_result + "$$\n";
    conf_desc_applied = "be greater than (or equal to) " + l_result;
    p_val_eq = "$$p = \\phi(z_{0})$$<br>Where \\(\\phi(z_{0}) = \\text{normalcdf}(z_{0},0,1)\\).";
    samp_p_val = jStat.normal.cdf(samp_z0,0,1);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } \\phi(" + z0 + ") \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a smaller mean quantity of " + quantity + " than do(es) " + population_2;
  }

  a = document.getElementById("confidence_insight");

  fillparams(a, [pdf_denote,conf_info,conf_int,test_stat,conf,conf_desc,conf_vals]);

  a = document.getElementById("calculate_confidence");

  fillparams(a,[tailed,pdf_func,calc_conf_eq,alph_eq,calc_conf_applied]);

  var v1 = +(pop_v1).toFixed(3);
  var v2 = +(pop_v2).toFixed(3);

  stats_list = "$$n_{1} = " + samp_n1 + "$$\n$$n_{2} = " + samp_n2 + "$$\n$$\\overline{x}_{1} = " + x1 + "$$\n$$\\overline{x}_{2} = " + x2 + "$$";

  test_stat_applied = "$$\\begin{align} z_{0} = &\\text{ }  \\frac{\\overline{x}_{1} - \\overline{x}_{2}}{\\sqrt{\\frac{\\sigma_{1}^{2}}{n_{1}} + \\frac{\\sigma_{2}^{2}}{n_{2}}}} \\\\\\\\ \n";
  test_stat_applied += "= &\\text{ }  \\frac{" + x1 + " - " + x2 + "}{\\sqrt{\\frac{" + v1 + "}{" + samp_n1 + "} + \\frac{" + v2 + "}{" + samp_n2 + "}}} \\\\\\\\ \n";
  test_stat_applied += " = &\\text{ } " + z0 + "\\end{align}$$";

  a = document.getElementById("confidence_result");

  fillparams(a,[conf,conf_desc_applied,conf,someone,someone,stats_list,test_stat_applied]);

  observed_ts = "\\(z_{0}\\)";

  var passed = (branch == "different") ? (samp_z0 >= lower && samp_z0 <= upper) : (branch == "less") ? (samp_z0 >= lower) : (samp_z0 <= upper);

  if (passed)
  {
    ts_place = "<b>inside</b>";
    ts_remark = "confirming our " + conf + "% confidence that it would do so!";
    ts_conclusion = "The observation behaved as expected from our original assumption,\n so we cannot arrive at a contradiction.";
    ts_conclusion += " Therefore, we fail to reject the null hypothesis.";
  }
  else
  {
    ts_place = "<b>outside</b> of";
    ts_remark = "even though we were " + conf + "% sure it would've fallen <b>inside</b>!";
    ts_conclusion = "This is the contradiction we were looking for to reject our null hypothesis!";
  }

  a = document.getElementById("evaluate_test");

  fillparams(a,[observed_ts,ts_place,ts_remark,ts_conclusion]);

  if (samp_p_val < alpha)
  {
    p_conclusion = "Since \\(p < \\alpha = " + alph + "\\), we reject the null, as expected.";
    evidence_amt = "sufficient";
    evidence_amt_2 = "found enough";
  }
  else
  {
    p_conclusion = "Since \\(p \\geq \\alpha = " + alph + "\\), we cannot reject the null, as expected.";
    evidence_amt = "insufficient";
    evidence_amt_2 = "did not find enough";
  }

  a = document.getElementById("calculate_p");

  fillparams(a,[p_val_eq,p_val_applied,p_conclusion]);


  a = document.getElementById("test_conclusion");

  fillparams(a,[someone,evidence_amt,alt_desc,null_hyp,evidence_amt_2,alt_hyp]);


  MathJax.typeset();

  data = zData(samp_z0);
  lChart = (branch == "greater") ? Math.min(-3,samp_z0 - 0.1) : lower;
  uChart = (branch == "less") ? Math.max(3,samp_z0 + 0.1) : upper;
  makeChart(data,conf, 0, jStat.normal.pdf(0,0,1) / 2, "z<sub>0</sub>", samp_z0,lChart,uChart);

}


//TWO SAMPLE PROP Z TEST


function perform_p2_test()
{
  test_name = "Two Sample Prop-Z Test";
  pop1_unit = "proportion of " + quantity + " in " + population_1;
  pop2_unit = "proportion of " + quantity + " in " + population_2;
  null_hyp = "$$H_{0} : p_{1} = p_{2}$$";
  var conf = +(100 * (1 - alpha)).toFixed(3);
  conf_equation = "\\(100(1 - \\alpha) = " + conf + "\\%\\)";
  var br = (branch == "greater") ? ">" : (branch == "less") ? "<" : "\\neq";
  alt_hyp = "$$H_{1} : p_{1} " + br + " p_{2}$$";

  var a = document.getElementById("null_alt");

  fillparams(a, [test_name,pop1_unit,pop2_unit,null_hyp,conf_equation,pop1_unit,branch,pop2_unit,alt_hyp]);

  assum = "difference in proportion of each population";
  assum_num = "\\(0\\)";
  assum_eq = "\\( p_{1} - p_{2} = 0 \\)";
  imp_condition = "treat the previously-defined statistics \\(\\hat{p}_{1},\\hat{p}_{2},n_{1},n_{2}\\)\n";
  imp_condition += " as random variables \\(\\hat{P}_{1},\\hat{P}_{2},N_{1},N_{2}\\) (i.e. we can observe these";
  imp_condition += " to be ANY realistic value, and the following conclusion will hold), and";
  imp_condition += " define another random variable \\(Z_{0}\\), called the test statistic, to be";
  test_stat_eq = "$$Z_{0} = \\frac{\\hat{P}_{1} - \\hat{P}_{2}}{\\sqrt{\\hat{P}(1 - \\hat{P})[\\frac{1}{N_{1}} + \\frac{1}{N_{2}}] }}$$<br>Where \\(\\hat{P} = \\frac{\\hat{P}_{1}N_{1} + \\hat{P}_{2}N_{2}}{N_{1} + N_{2}}\\)";
  test_stat = "\\(Z_{0}\\)";
  pdf = "standard normal distribution";
  pdf_denote = "\\(Z_{0} \\sim N(0,1)\\)";

  a = document.getElementById("can_conclude");

  fillparams(a,[assum,assum_num,assum_eq,imp_condition,test_stat_eq,test_stat,pdf,pdf_denote]);

  var p1 = +(samp_p1).toFixed(3);
  var p2 = +(samp_p2).toFixed(3);
  samp_ph = ((samp_p1*samp_n1) + (samp_p2*samp_n2))/(samp_n1 + samp_n2);
  var ph = +(samp_ph).toFixed(3);
  samp_z0 = (samp_p1 - samp_p2) / Math.sqrt(samp_ph * (1 - samp_ph) * ((1/samp_n1) + (1/samp_n2)));
  var z0 = +(samp_z0).toFixed(3);

  var alph = +(alpha).toFixed(3);
  alph_eq = "\\(\\alpha = " + alph + "\\)";
  pdf_func = "\\(N(0,1)\\)";
  conf_info = conf + "% ";

  if (branch == "different")
  {
    tailed = "two-tailed";
    conf_info += tailed;
    conf_int = "\\([L,U]\\)";
    conf_vals = "\\(L\\) and \\(U\\)"
    conf_desc = "fall between the values " + conf_vals;
    calc_conf_eq = "$$L = \\text{invNorm}(\\alpha/2,0,1)$$\n";
    calc_conf_eq += "$$U = \\text{invNorm}(1 - \\alpha/2,0,1)$$\n";
    lower = jStat.normal.inv(alpha/2,0,1);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invNorm}(" + alph + "/2,0,1) = " + l_result + "$$\n";
    upper = jStat.normal.inv(1 - alpha/2,0,1);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied += "$$U = \\text{invNorm}(1 - " + alph + "/2,0,1) = " + u_result + "$$\n";
    conf_desc_applied = "fall between " + l_result + " and " + u_result;
    p_val_eq = "$$p = 2(1 - \\phi(|z_{0}|))$$<br>Where \\(\\phi(|z_{0}|) = \\text{normalcdf}(|z_{0}|,0,1)\\).";
    samp_p_val = 2 * (1 - jStat.normal.cdf(Math.abs(samp_z0),0,1));
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align} p = & \\text{ } 2(1 - \\phi(|" + z0 + "|)) \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " and " + population_2 + " produce different proportions of " + quantity;
  }
  else if (branch == "greater")
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\((-\\infty,U]\\)";
    conf_vals = "\\(U\\)";
    conf_desc = "be less than (or equal to) " + conf_vals;
    calc_conf_eq = "$$U = \\text{invNorm}(1 - \\alpha,0,1)$$\n";
    upper = jStat.normal.inv(1 - alpha,0,1);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied = "$$U = \\text{invNorm}(1 - " + alph + ",0,1) = " + u_result + "$$\n";
    conf_desc_applied = "be less than (or equal to) " + u_result;
    p_val_eq = "$$p = 1 - \\phi(z_{0})$$<br>Where \\(\\phi(z_{0}) = \\text{normalcdf}(z_{0},0,1)\\).";
    samp_p_val = 1 - jStat.normal.cdf(samp_z0,0,1);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } 1 - \\phi(" + z0 + ") \\\\\\\\ = \\text{ } & " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a larger proportion of " + quantity + " than do(es) " + population_2;
  }
  else
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\([L,\\infty)\\)";
    conf_vals = "\\(L\\)";
    conf_desc = "be greater than (or equal to) " + conf_vals;
    calc_conf_eq = "$$L = \\text{invNorm}(\\alpha,0,1)$$\n";
    lower = jStat.normal.inv(alpha,0,1);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invNorm}(" + alph + ",0,1) = " + l_result + "$$\n";
    conf_desc_applied = "be greater than (or equal to) " + l_result;
    p_val_eq = "$$p = \\phi(z_{0})$$<br>Where \\(\\phi(z_{0}) = \\text{normalcdf}(z_{0},0,1)\\).";
    samp_p_val = jStat.normal.cdf(samp_z0,0,1);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } \\phi(" + z0 + ") \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a smaller proportion of " + quantity + " than do(es) " + population_2;
  }

  a = document.getElementById("confidence_insight");

  fillparams(a, [pdf_denote,conf_info,conf_int,test_stat,conf,conf_desc,conf_vals]);

  a = document.getElementById("calculate_confidence");

  fillparams(a,[tailed,pdf_func,calc_conf_eq,alph_eq,calc_conf_applied]);


  stats_list = "$$n_{1} = " + samp_n1 + "$$\n$$n_{2} = " + samp_n2 + "$$\n$$\\hat{p}_{1} = " + p1 + "$$\n$$\\hat{p}_{2} = " + p2 + "$$\n";
  stats_list += "<br>If we calculate \\(\\hat{p}\\) as follows\n";
  stats_list += "$$\\begin{align} \\hat{p} = & \\text{ } \\frac{\\hat{p}_{1}n_{1} + \\hat{p}_{2}n_{2}}{n_{1} + n_{2}} \\\\\\\\ \n";
  stats_list += " = & \\text{ } \\frac{(" + p1 + ")(" + samp_n1 + ") + (" + p2 + ")(" + samp_n2 + ")}{" + samp_n1 + " + " + samp_n2 + "} \\\\\\\\ \n";
  stats_list += " = & \\text{ } " + ph + " \\end{align}$$";

  test_stat_applied = "$$\\begin{align} z_{0} = &\\text{ }   \\frac{\\hat{p}_{1} - \\hat{p}_{2}}{\\sqrt{\\hat{p}(1 - \\hat{p})[\\frac{1}{n_{1}} + \\frac{1}{n_{2}}] }} \\\\\\\\ \n";
  test_stat_applied += "= &\\text{ } \\frac{" + p1 + " - " + p2 + "}{\\sqrt{" + ph + "(1 - " + ph + ")[\\frac{1}{" + samp_n1 + "} + \\frac{1}{" + samp_n2 + "}] }} \\\\\\\\ \n";
  test_stat_applied += " = &\\text{ } " + z0 + "\\end{align}$$";

  a = document.getElementById("confidence_result");

  fillparams(a,[conf,conf_desc_applied,conf,someone,someone,stats_list,test_stat_applied]);

  observed_ts = "\\(z_{0}\\)";

  var passed = (branch == "different") ? (samp_z0 >= lower && samp_z0 <= upper) : (branch == "less") ? (samp_z0 >= lower) : (samp_z0 <= upper);

  if (passed)
  {
    ts_place = "<b>inside</b>";
    ts_remark = "confirming our " + conf + "% confidence that it would do so!";
    ts_conclusion = "The observation behaved as expected from our original assumption,\n so we cannot arrive at a contradiction.";
    ts_conclusion += " Therefore, we fail to reject the null hypothesis.";
  }
  else
  {
    ts_place = "<b>outside</b> of";
    ts_remark = "even though we were " + conf + "% sure it would've fallen <b>inside</b>!";
    ts_conclusion = "This is the contradiction we were looking for to reject our null hypothesis!";
  }

  a = document.getElementById("evaluate_test");

  fillparams(a,[observed_ts,ts_place,ts_remark,ts_conclusion]);

  if (samp_p_val < alpha)
  {
    p_conclusion = "Since \\(p < \\alpha = " + alph + "\\), we reject the null, as expected.";
    evidence_amt = "sufficient";
    evidence_amt_2 = "found enough";
  }
  else
  {
    p_conclusion = "Since \\(p \\geq \\alpha = " + alph + "\\), we cannot reject the null, as expected.";
    evidence_amt = "insufficient";
    evidence_amt_2 = "did not find enough";
  }

  a = document.getElementById("calculate_p");

  fillparams(a,[p_val_eq,p_val_applied,p_conclusion]);


  a = document.getElementById("test_conclusion");

  fillparams(a,[someone,evidence_amt,alt_desc,null_hyp,evidence_amt_2,alt_hyp]);


  MathJax.typeset();

  data = zData(samp_z0);
  lChart = (branch == "greater") ? Math.min(-3,samp_z0 - 0.1) : lower;
  uChart = (branch == "less") ? Math.max(3,samp_z0 + 0.1) : upper;
  makeChart(data,conf, 0, jStat.normal.pdf(0,0,1) / 2, "z<sub>0</sub>", samp_z0,lChart,uChart);

}



//PAIRED T-TEST


function perform_pt_test()
{
  test_name = "Paired T-Test";
  pop1_unit = "mean difference in paired quantities of " + quantity;
  pop2_unit = "value 0";
  null_hyp = "$$H_{0} : \\mu_{d} = 0$$";
  var conf = +(100 * (1 - alpha)).toFixed(3);
  conf_equation = "\\(100(1 - \\alpha) = " + conf + "\\%\\)";
  var br = (branch == "greater") ? ">" : (branch == "less") ? "<" : "\\neq";
  alt_hyp = "$$H_{1} : \\mu_{d} " + br + " 0$$";

  var a = document.getElementById("null_alt");

  fillparams(a, [test_name,pop1_unit,pop2_unit,null_hyp,conf_equation,pop1_unit,branch,pop2_unit,alt_hyp]);

  df = samp_n - 1;

  assum = "mean difference in paired quantities of " + quantity;;
  assum_num = "\\(0\\)";
  assum_eq = "\\( \\mu_{d} = 0 \\)";
  imp_condition = "<br><br>1. Make \\(n = " + samp_n + "\\) paired observations\n";
  imp_condition += "<br><br>2. Treat the previously-defined statistics \\(\\overline{d},s_{d}\\)\n";
  imp_condition += " as random variables \\(\\overline{D},S_{d}\\) (i.e. we can observe these\n";
  imp_condition += " to be ANY realistic value, and the following conclusion will hold)<br><br>\n";
  imp_condition += "3. Define another random variable \\(T_{0}\\), called the test statistic, to be";
  test_stat_eq = "$$T_{0} = \\frac{\\overline{D}}{S_{d} / \\sqrt{n}}$$";
  test_stat = "\\(T_{0}\\)";
  pdf = "T distribution with \\(n - 1 = " + df + "\\) degrees of freedom";
  pdf_denote = "\\(T_{0} \\sim T(" + df + ")\\)";

  a = document.getElementById("can_conclude");

  fillparams(a,[assum,assum_num,assum_eq,imp_condition,test_stat_eq,test_stat,pdf,pdf_denote]);

  var d = +(samp_d).toFixed(3);
  var sd = +(samp_sd).toFixed(3);
  samp_t0 = samp_d / (sd / Math.sqrt(samp_n));
  var t0 = +(samp_t0).toFixed(3);

  var alph = +(alpha).toFixed(3);
  alph_eq = "\\(\\alpha = " + alph + "\\)";
  pdf_func = "\\(T(" + df + ")\\)";
  conf_info = conf + "% ";

  if (branch == "different")
  {
    tailed = "two-tailed";
    conf_info += tailed;
    conf_int = "\\([L,U]\\)";
    conf_vals = "\\(L\\) and \\(U\\)"
    conf_desc = "fall between the values " + conf_vals;
    calc_conf_eq = "$$L = \\text{invT}(\\alpha/2," + df + ")$$\n";
    calc_conf_eq += "$$U = \\text{invT}(1 - \\alpha/2," + df + ")$$\n";
    lower = jStat.studentt.inv(alpha/2,df);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invT}(" + alph + "/2," + df + ") = " + l_result + "$$\n";
    upper = jStat.studentt.inv(1 - alpha/2,df);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied += "$$U = \\text{invT}(1 - " + alph + "/2," + df + ") = " + u_result + "$$\n";
    conf_desc_applied = "fall between " + l_result + " and " + u_result;
    p_val_eq = "$$p = 2[1 - \\text{Tcdf}(|t_{0}|, " + df + ")]$$";
    samp_p_val = 2 * (1 - jStat.studentt.cdf(Math.abs(samp_t0),df));
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align} p = & \\text{ } 2[1 - \\text{Tcdf}(|" + t0 + "|," + df + ")] \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = "that the mean difference in paired quantities of " + quantity + " is something other than zero";
  }
  else if (branch == "greater")
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\((-\\infty,U]\\)";
    conf_vals = "\\(U\\)";
    conf_desc = "be less than (or equal to) " + conf_vals;
    calc_conf_eq = "$$U = \\text{invT}(1 - \\alpha," + df + ")$$\n";
    upper = jStat.studentt.inv(1 - alpha,df);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied = "$$U = \\text{invT}(1 - " + alph + "," + df + ") = " + u_result + "$$\n";
    conf_desc_applied = "be less than (or equal to) " + u_result;
    p_val_eq = "$$p = 1 - \\text{Tcdf}(t_{0}," + df + ")$$";
    samp_p_val = 1 - jStat.studentt.cdf(samp_t0,df);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } 1 - \\text{Tcdf}(" + t0 + "," + df + ") \\\\\\\\ = \\text{ } & " + p_val + "\\end{align}$$";
    alt_desc = "that the mean difference in paired quantities of " + quantity + " is a positive value";
  }
  else
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\([L,\\infty)\\)";
    conf_vals = "\\(L\\)";
    conf_desc = "be greater than (or equal to) " + conf_vals;
    calc_conf_eq = "$$L = \\text{invT}(\\alpha," + df + ")$$\n";
    lower = jStat.studentt.inv(alpha,df);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invT}(" + alph + "," + df + ") = " + l_result + "$$\n";
    conf_desc_applied = "be greater than (or equal to) " + l_result;
    p_val_eq = "$$p = \\text{Tcdf}(t_{0}," + df + ")$$";
    samp_p_val = jStat.studentt.cdf(samp_t0,df);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } \\text{Tcdf}(" + t0 + "," + df + ") \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = "that the mean difference in paired quantities of " + quantity + " is a negative value";
  }

  a = document.getElementById("confidence_insight");

  fillparams(a, [pdf_denote,conf_info,conf_int,test_stat,conf,conf_desc,conf_vals]);

  a = document.getElementById("calculate_confidence");

  fillparams(a,[tailed,pdf_func,calc_conf_eq,alph_eq,calc_conf_applied]);


  stats_list = "$$n = " + samp_n + "$$\n$$\\overline{d} = " + d + "$$\n$$s_{d} = " + sd + "$$\n";

  test_stat_applied = "$$\\begin{align} t_{0} = &\\text{ }  \\frac{\\overline{d}}{s_{d} / \\sqrt{n}}  \\\\\\\\ \n";
  test_stat_applied += "= &\\text{ } \\frac{" + d + "}{" + sd + " / \\sqrt{" + samp_n + "}} \\\\\\\\ \n";
  test_stat_applied += " = &\\text{ } " + t0 + "\\end{align}$$";

  a = document.getElementById("confidence_result");

  fillparams(a,[conf,conf_desc_applied,conf,someone,someone,stats_list,test_stat_applied]);

  observed_ts = "\\(t_{0}\\)";

  var passed = (branch == "different") ? (samp_t0 >= lower && samp_t0 <= upper) : (branch == "less") ? (samp_t0 >= lower) : (samp_t0 <= upper);

  if (passed)
  {
    ts_place = "<b>inside</b>";
    ts_remark = "confirming our " + conf + "% confidence that it would do so!";
    ts_conclusion = "The observation behaved as expected from our original assumption,\n so we cannot arrive at a contradiction.";
    ts_conclusion += " Therefore, we fail to reject the null hypothesis.";
  }
  else
  {
    ts_place = "<b>outside</b> of";
    ts_remark = "even though we were " + conf + "% sure it would've fallen <b>inside</b>!";
    ts_conclusion = "This is the contradiction we were looking for to reject our null hypothesis!";
  }

  a = document.getElementById("evaluate_test");

  fillparams(a,[observed_ts,ts_place,ts_remark,ts_conclusion]);

  if (samp_p_val < alpha)
  {
    p_conclusion = "Since \\(p < \\alpha = " + alph + "\\), we reject the null, as expected.";
    evidence_amt = "sufficient";
    evidence_amt_2 = "found enough";
  }
  else
  {
    p_conclusion = "Since \\(p \\geq \\alpha = " + alph + "\\), we cannot reject the null, as expected.";
    evidence_amt = "insufficient";
    evidence_amt_2 = "did not find enough";
  }

  a = document.getElementById("calculate_p");

  fillparams(a,[p_val_eq,p_val_applied,p_conclusion]);


  a = document.getElementById("test_conclusion");

  fillparams(a,[someone,evidence_amt,alt_desc,null_hyp,evidence_amt_2,alt_hyp]);


  MathJax.typeset();

  data = tData(df,samp_t0);
  lChart = (branch == "greater") ? Math.min(-3.5,samp_t0 - 0.1) : lower;
  uChart = (branch == "less") ? Math.max(3.5,samp_t0 + 0.1) : upper;
  makeChart(data,conf, 0, jStat.studentt.pdf(0,df) / 2, "t<sub>0</sub>", samp_t0,lChart,uChart);
}



//UNPOOLED T-TEST


function perform_t2u_test()
{
  test_name = "Unpooled T-Test";
  pop1_unit = "mean quantity of " + quantity + " in " + population_1;
  pop2_unit = "mean quantity of " + quantity + " in " + population_2;;
  null_hyp = "$$H_{0} : \\mu_{1} = \\mu_{2}$$";
  var conf = +(100 * (1 - alpha)).toFixed(3);
  conf_equation = "\\(100(1 - \\alpha) = " + conf + "\\%\\)";
  var br = (branch == "greater") ? ">" : (branch == "less") ? "<" : "\\neq";
  alt_hyp = "$$H_{1} : \\mu_{1} " + br + " \\mu_{2}$$";

  var a = document.getElementById("null_alt");

  fillparams(a, [test_name,pop1_unit,pop2_unit,null_hyp,conf_equation,pop1_unit,branch,pop2_unit,alt_hyp]);

  var s2_1 = +(samp_s2_1).toFixed(3);
  var s2_2 = +(samp_s2_2).toFixed(3);
  var x1 = +(samp_x1).toFixed(3);
  var x2 = +(samp_x2).toFixed(3);

  samp_df = Math.pow( (samp_s2_1 / samp_n1) + (samp_s2_2 / samp_n2) ,2) / ( ( Math.pow( samp_s2_1 / samp_n1 , 2) / (samp_n1 - 1) ) + ( Math.pow( samp_s2_2 / samp_n2 , 2) / (samp_n2 - 1) ) );
  var df = +(samp_df).toFixed(3);
  samp_t0 = (samp_x1 - samp_x2) / Math.sqrt( (samp_s2_1 / samp_n1) + (samp_s2_2 / samp_n2) );
  var t0 = +(samp_t0).toFixed(3);


  assum = "difference in mean of each population";
  assum_num = "\\(0\\)";
  assum_eq = "\\( \\mu_{1} - \\mu_{2} = 0 \\)";
  imp_condition = "<br><br>1. Make \\(n_{1} = " + samp_n1 + "\\) observations from " + population_1 + " and find that \\(s_{1}^{2} = " + s2_1 + "\\)\n";
  imp_condition += "<br><br>2. Make \\(n_{2} = " + samp_n2 + "\\) observations from \n" + population_2 + " and find that \\(s_{2}^{2} = " + s2_2 + "\\)\n";
  imp_condition += "<br><br>3. Treat the observed sample means \\(\\overline{x}_{1},\\overline{x}_{2}\\)\n";
  imp_condition += " as random variables \\(\\overline{X}_{1},\\overline{X}_{2}\\) (i.e. we can observe these\n";
  imp_condition += " to be ANY realistic value, and the following conclusion will hold)<br><br>\n";
  imp_condition += "3. Define another random variable \\(T_{0}\\), called the test statistic, to be";
  test_stat_eq = "$$T_{0} = \\frac{\\overline{X}_{1} - \\overline{X}_{2}}{\\sqrt{\\frac{s_{1}^{2}}{n_{1}} + \\frac{s_{2}^{2}}{n_{2}}}}$$";
  test_stat = "\\(T_{0}\\)";
  pdf = "T distribution with \\(v\\) degrees of freedom, where \\(v\\) is defined as follows<br>\n";
  pdf += "$$\\begin{align} v = & \\text{ } \\frac{ ( \\frac{s_{1}^{2}}{n_{1}} + \\frac{s_{2}^{2}}{n_{2}} )^{2} }{ \\frac{ (\\frac{s_{1}^{2}}{n_{1}})^{2} }{n_{1} - 1} + \\frac{ (\\frac{s_{2}^{2}}{n_{2}})^{2} }{n_{2} - 1} } \\\\\\\\ \n";
  pdf += " = & \\text{ } \\frac{ ( \\frac{" + s2_1 + "}{" + samp_n1 + "} + \\frac{" + s2_2 + "}{" + samp_n2 + "} )^{2} }{ \\frac{ (\\frac{" + s2_1 + "}{" + samp_n1 + "})^{2} }{" + samp_n1 + " - 1} + \\frac{ (\\frac{" + s2_2 + "}{" + samp_n2 + "})^{2} }{" + samp_n2 + " - 1} } \\\\\\\\ \n";
  pdf += " = & \\text{ } " + df + "\\end{align}$$";
  pdf_denote = "\\(T_{0} \\sim T(" + df + ")\\)";

  a = document.getElementById("can_conclude");

  fillparams(a,[assum,assum_num,assum_eq,imp_condition,test_stat_eq,test_stat,pdf,pdf_denote]);

  var alph = +(alpha).toFixed(3);
  alph_eq = "\\(\\alpha = " + alph + "\\)";
  pdf_func = "\\(T(" + df + ")\\)";
  conf_info = conf + "% ";

  if (branch == "different")
  {
    tailed = "two-tailed";
    conf_info += tailed;
    conf_int = "\\([L,U]\\)";
    conf_vals = "\\(L\\) and \\(U\\)"
    conf_desc = "fall between the values " + conf_vals;
    calc_conf_eq = "$$L = \\text{invT}(\\alpha/2," + df + ")$$\n";
    calc_conf_eq += "$$U = \\text{invT}(1 - \\alpha/2," + df + ")$$\n";
    lower = jStat.studentt.inv(alpha/2,samp_df);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invT}(" + alph + "/2," + df + ") = " + l_result + "$$\n";
    upper = jStat.studentt.inv(1 - alpha/2,samp_df);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied += "$$U = \\text{invT}(1 - " + alph + "/2," + df + ") = " + u_result + "$$\n";
    conf_desc_applied = "fall between " + l_result + " and " + u_result;
    p_val_eq = "$$p = 2[1 - \\text{Tcdf}(|t_{0}|, " + df + ")]$$";
    samp_p_val = 2 * (1 - jStat.studentt.cdf(Math.abs(samp_t0),samp_df));
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align} p = & \\text{ } 2[1 - \\text{Tcdf}(|" + t0 + "|," + df + ")] \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " and " + population_2 + " produce different mean quantities of " + quantity;
  }
  else if (branch == "greater")
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\((-\\infty,U]\\)";
    conf_vals = "\\(U\\)";
    conf_desc = "be less than (or equal to) " + conf_vals;
    calc_conf_eq = "$$U = \\text{invT}(1 - \\alpha," + df + ")$$\n";
    upper = jStat.studentt.inv(1 - alpha,samp_df);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied = "$$U = \\text{invT}(1 - " + alph + "," + df + ") = " + u_result + "$$\n";
    conf_desc_applied = "be less than (or equal to) " + u_result;
    p_val_eq = "$$p = 1 - \\text{Tcdf}(t_{0}," + df + ")$$";
    samp_p_val = 1 - jStat.studentt.cdf(samp_t0,samp_df);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } 1 - \\text{Tcdf}(" + t0 + "," + df + ") \\\\\\\\ = \\text{ } & " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a larger mean quantity of " + quantity + " than do(es) " + population_2;
  }
  else
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\([L,\\infty)\\)";
    conf_vals = "\\(L\\)";
    conf_desc = "be greater than (or equal to) " + conf_vals;
    calc_conf_eq = "$$L = \\text{invT}(\\alpha," + df + ")$$\n";
    lower = jStat.studentt.inv(alpha,samp_df);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invT}(" + alph + "," + df + ") = " + l_result + "$$\n";
    conf_desc_applied = "be greater than (or equal to) " + l_result;
    p_val_eq = "$$p = \\text{Tcdf}(t_{0}," + df + ")$$";
    samp_p_val = jStat.studentt.cdf(samp_t0,samp_df);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } \\text{Tcdf}(" + t0 + "," + df + ") \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a smaller mean quantity of " + quantity + " than do(es) " + population_2;
  }

  a = document.getElementById("confidence_insight");

  fillparams(a, [pdf_denote,conf_info,conf_int,test_stat,conf,conf_desc,conf_vals]);

  a = document.getElementById("calculate_confidence");

  fillparams(a,[tailed,pdf_func,calc_conf_eq,alph_eq,calc_conf_applied]);


  stats_list = "$$n_{1} = " + samp_n1 + "$$\n$$n_{2} = " + samp_n2 + "$$\n$$\\overline{x}_{1} = " + x1 + "$$\n$$\\overline{x}_{2} = " + x2 + "$$\n$$s_{1}^{2} = " + s2_1 + "$$\n$$s_{2}^{2} = " + s2_2 + "$$\n";

  test_stat_applied = "$$\\begin{align} t_{0} = &\\text{ } \\frac{\\overline{x}_{1} - \\overline{x}_{2}}{\\sqrt{\\frac{s_{1}^{2}}{n_{1}} + \\frac{s_{2}^{2}}{n_{2}}}}  \\\\\\\\ \n";
  test_stat_applied += "= &\\text{ } \\frac{" + x1 + " - " + x2 + "}{\\sqrt{\\frac{" + s2_1 + "}{" + samp_n1 + "} + \\frac{" + s2_2 + "}{" + samp_n2 + "}}} \\\\\\\\ \n";
  test_stat_applied += " = &\\text{ } " + t0 + "\\end{align}$$";

  a = document.getElementById("confidence_result");

  fillparams(a,[conf,conf_desc_applied,conf,someone,someone,stats_list,test_stat_applied]);

  observed_ts = "\\(t_{0}\\)";

  var passed = (branch == "different") ? (samp_t0 >= lower && samp_t0 <= upper) : (branch == "less") ? (samp_t0 >= lower) : (samp_t0 <= upper);

  if (passed)
  {
    ts_place = "<b>inside</b>";
    ts_remark = "confirming our " + conf + "% confidence that it would do so!";
    ts_conclusion = "The observation behaved as expected from our original assumption,\n so we cannot arrive at a contradiction.";
    ts_conclusion += " Therefore, we fail to reject the null hypothesis.";
  }
  else
  {
    ts_place = "<b>outside</b> of";
    ts_remark = "even though we were " + conf + "% sure it would've fallen <b>inside</b>!";
    ts_conclusion = "This is the contradiction we were looking for to reject our null hypothesis!";
  }

  a = document.getElementById("evaluate_test");

  fillparams(a,[observed_ts,ts_place,ts_remark,ts_conclusion]);

  if (samp_p_val < alpha)
  {
    p_conclusion = "Since \\(p < \\alpha = " + alph + "\\), we reject the null, as expected.";
    evidence_amt = "sufficient";
    evidence_amt_2 = "found enough";
  }
  else
  {
    p_conclusion = "Since \\(p \\geq \\alpha = " + alph + "\\), we cannot reject the null, as expected.";
    evidence_amt = "insufficient";
    evidence_amt_2 = "did not find enough";
  }

  a = document.getElementById("calculate_p");

  fillparams(a,[p_val_eq,p_val_applied,p_conclusion]);


  a = document.getElementById("test_conclusion");

  fillparams(a,[someone,evidence_amt,alt_desc,null_hyp,evidence_amt_2,alt_hyp]);


  MathJax.typeset();

  data = tData(df,samp_t0);
  lChart = (branch == "greater") ? Math.min(-3.5,samp_t0 - 0.1) : lower;
  uChart = (branch == "less") ? Math.max(3.5,samp_t0 + 0.1) : upper;
  makeChart(data,conf, 0, jStat.studentt.pdf(0,df) / 2, "t<sub>0</sub>", samp_t0,lChart,uChart);
}




//POOLED T-TEST


function perform_t2p_test()
{
  test_name = "Pooled T-Test";
  pop1_unit = "mean quantity of " + quantity + " in " + population_1;
  pop2_unit = "mean quantity of " + quantity + " in " + population_2;;
  null_hyp = "$$H_{0} : \\mu_{1} = \\mu_{2}$$";
  var conf = +(100 * (1 - alpha)).toFixed(3);
  conf_equation = "\\(100(1 - \\alpha) = " + conf + "\\%\\)";
  var br = (branch == "greater") ? ">" : (branch == "less") ? "<" : "\\neq";
  alt_hyp = "$$H_{1} : \\mu_{1} " + br + " \\mu_{2}$$";

  var a = document.getElementById("null_alt");

  fillparams(a, [test_name,pop1_unit,pop2_unit,null_hyp,conf_equation,pop1_unit,branch,pop2_unit,alt_hyp]);

  var s2_1 = +(samp_s2_1).toFixed(3);
  var s2_2 = +(samp_s2_2).toFixed(3);
  var x1 = +(samp_x1).toFixed(3);
  var x2 = +(samp_x2).toFixed(3);


  var samp_df = samp_n1 + samp_n2 - 2;
  df = samp_df;

  samp_sp = Math.sqrt(((samp_n1 - 1)*samp_s2_1 + (samp_n2 - 1)*(samp_s2_2)) / df )
  sp = +(samp_sp).toFixed(3);

  samp_t0 = (samp_x1 - samp_x2) / (samp_sp * Math.sqrt( (1 / samp_n1) + (1 / samp_n2) ));
  var t0 = +(samp_t0).toFixed(3);


  assum = "difference in mean of each population";
  assum_num = "\\(0\\)";
  assum_eq = "\\( \\mu_{1} - \\mu_{2} = 0 \\)";

  imp_condition = "<br><br>1. Make \\(n_{1} = " + samp_n1 + "\\) observations from " + population_1 + " and ";
  imp_condition += "\\(n_{2} = " + samp_n2 + "\\) observations from \n" + population_2;
  imp_condition += "<br><br>2. Treat the previously-defined statistics \\(\\overline{x}_{1},\\overline{x}_{2},s_{1}^{2},s_{2}^{2}\\)\n";
  imp_condition += " as random variables \\(\\overline{X}_{1},\\overline{X}_{2},S_{1}^{2},S_{2}^{2}\\) (i.e. we can observe these\n";
  imp_condition += " to be ANY realistic value, and the following conclusion will hold)<br><br>\n";
  imp_condition += "3. Define another random variable \\(T_{0}\\), called the test statistic, to be";

  test_stat_eq = "$$T_{0} = \\frac{\\overline{X}_{1} - \\overline{X}_{2}}{S_{p} \\sqrt{\\frac{1}{n_{1}} + \\frac{1}{n_{2}}}}$$\n";
  test_stat_eq += "<br><br>Where \\(S_{p}\\) is defined as follows<br>\n";
  test_stat_eq += "$$S_{p} = \\sqrt{\\frac{(n_{1} - 1) S_{1}^{2} + (n_{2} - 1) S_{2}^{2} }{n_{1} + n_{2} - 2}}$$"

  test_stat = "\\(T_{0}\\)";
  pdf = "T distribution with \\(n_{1} + n_{2} - 2 = " + df + "\\) degrees of freedom";

  pdf_denote = "\\(T_{0} \\sim T(" + df + ")\\)";

  a = document.getElementById("can_conclude");

  fillparams(a,[assum,assum_num,assum_eq,imp_condition,test_stat_eq,test_stat,pdf,pdf_denote]);

  var alph = +(alpha).toFixed(3);
  alph_eq = "\\(\\alpha = " + alph + "\\)";
  pdf_func = "\\(T(" + df + ")\\)";
  conf_info = conf + "% ";

  if (branch == "different")
  {
    tailed = "two-tailed";
    conf_info += tailed;
    conf_int = "\\([L,U]\\)";
    conf_vals = "\\(L\\) and \\(U\\)"
    conf_desc = "fall between the values " + conf_vals;
    calc_conf_eq = "$$L = \\text{invT}(\\alpha/2," + df + ")$$\n";
    calc_conf_eq += "$$U = \\text{invT}(1 - \\alpha/2," + df + ")$$\n";
    lower = jStat.studentt.inv(alpha/2,samp_df);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invT}(" + alph + "/2," + df + ") = " + l_result + "$$\n";
    upper = jStat.studentt.inv(1 - alpha/2,samp_df);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied += "$$U = \\text{invT}(1 - " + alph + "/2," + df + ") = " + u_result + "$$\n";
    conf_desc_applied = "fall between " + l_result + " and " + u_result;
    p_val_eq = "$$p = 2[1 - \\text{Tcdf}(|t_{0}|, " + df + ")]$$";
    samp_p_val = 2 * (1 - jStat.studentt.cdf(Math.abs(samp_t0),samp_df));
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align} p = & \\text{ } 2[1 - \\text{Tcdf}(|" + t0 + "|," + df + ")] \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " and " + population_2 + " produce different mean quantities of " + quantity;
  }
  else if (branch == "greater")
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\((-\\infty,U]\\)";
    conf_vals = "\\(U\\)";
    conf_desc = "be less than (or equal to) " + conf_vals;
    calc_conf_eq = "$$U = \\text{invT}(1 - \\alpha," + df + ")$$\n";
    upper = jStat.studentt.inv(1 - alpha,samp_df);
    var u_result = +(upper).toFixed(3);
    calc_conf_applied = "$$U = \\text{invT}(1 - " + alph + "," + df + ") = " + u_result + "$$\n";
    conf_desc_applied = "be less than (or equal to) " + u_result;
    p_val_eq = "$$p = 1 - \\text{Tcdf}(t_{0}," + df + ")$$";
    samp_p_val = 1 - jStat.studentt.cdf(samp_t0,samp_df);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } 1 - \\text{Tcdf}(" + t0 + "," + df + ") \\\\\\\\ = \\text{ } & " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a larger mean quantity of " + quantity + " than do(es) " + population_2;
  }
  else
  {
    tailed = "one-tailed";
    conf_info += tailed;
    conf_int = "\\([L,\\infty)\\)";
    conf_vals = "\\(L\\)";
    conf_desc = "be greater than (or equal to) " + conf_vals;
    calc_conf_eq = "$$L = \\text{invT}(\\alpha," + df + ")$$\n";
    lower = jStat.studentt.inv(alpha,samp_df);
    var l_result = +(lower).toFixed(3);
    calc_conf_applied = "$$L = \\text{invT}(" + alph + "," + df + ") = " + l_result + "$$\n";
    conf_desc_applied = "be greater than (or equal to) " + l_result;
    p_val_eq = "$$p = \\text{Tcdf}(t_{0}," + df + ")$$";
    samp_p_val = jStat.studentt.cdf(samp_t0,samp_df);
    p_val = +(samp_p_val).toFixed(6);
    p_val_applied = "$$\\begin{align}p = & \\text{ } \\text{Tcdf}(" + t0 + "," + df + ") \\\\\\\\ = & \\text{ } " + p_val + "\\end{align}$$";
    alt_desc = population_1 + " produce(s) a smaller mean quantity of " + quantity + " than do(es) " + population_2;
  }

  a = document.getElementById("confidence_insight");

  fillparams(a, [pdf_denote,conf_info,conf_int,test_stat,conf,conf_desc,conf_vals]);

  a = document.getElementById("calculate_confidence");

  fillparams(a,[tailed,pdf_func,calc_conf_eq,alph_eq,calc_conf_applied]);


  stats_list = "$$n_{1} = " + samp_n1 + "$$\n$$n_{2} = " + samp_n2 + "$$\n$$\\overline{x}_{1} = " + x1 + "$$\n$$\\overline{x}_{2} = " + x2 + "$$\n$$s_{1}^{2} = " + s2_1 + "$$\n$$s_{2}^{2} = " + s2_2 + "$$\n";
  stats_list += "<br>If we calculate \\(s_{p}\\) as follows\n";
  stats_list += "$$\\begin{align} s_{p} = & \\text{ } \\sqrt{\\frac{(n_{1} - 1)s_{1}^{2} + (n_{2} - 1)s_{2}^{2} }{n_{1} + n_{2} - 2} } \\\\\\\\ \n";
  stats_list += " = & \\text{ } \\sqrt{\\frac{(" + samp_n1 + " - 1)" + s2_1 + " + (" + samp_n2 + " - 1)" + s2_2 + " }{" + samp_n1 + " + " + samp_n2 + " - 2} } \\\\\\\\ \n";
  stats_list += " = & \\text{ } " + sp + " \\end{align}$$";

  test_stat_applied = "$$\\begin{align} t_{0} = &\\text{ } \\frac{\\overline{x}_{1} - \\overline{x}_{2}}{s_{p} \\sqrt{\\frac{1}{n_{1}} + \\frac{1}{n_{2}}}}  \\\\\\\\ \n";
  test_stat_applied += "= &\\text{ } \\frac{" + x1 + " - " + x2 + "}{" + sp + "\\sqrt{\\frac{1}{" + samp_n1 + "} + \\frac{1}{" + samp_n2 + "}}} \\\\\\\\ \n";
  test_stat_applied += " = &\\text{ } " + t0 + "\\end{align}$$";

  a = document.getElementById("confidence_result");

  fillparams(a,[conf,conf_desc_applied,conf,someone,someone,stats_list,test_stat_applied]);

  observed_ts = "\\(t_{0}\\)";

  var passed = (branch == "different") ? (samp_t0 >= lower && samp_t0 <= upper) : (branch == "less") ? (samp_t0 >= lower) : (samp_t0 <= upper);

  if (passed)
  {
    ts_place = "<b>inside</b>";
    ts_remark = "confirming our " + conf + "% confidence that it would do so!";
    ts_conclusion = "The observation behaved as expected from our original assumption,\n so we cannot arrive at a contradiction.";
    ts_conclusion += " Therefore, we fail to reject the null hypothesis.";
  }
  else
  {
    ts_place = "<b>outside</b> of";
    ts_remark = "even though we were " + conf + "% sure it would've fallen <b>inside</b>!";
    ts_conclusion = "This is the contradiction we were looking for to reject our null hypothesis!";
  }

  a = document.getElementById("evaluate_test");

  fillparams(a,[observed_ts,ts_place,ts_remark,ts_conclusion]);

  if (samp_p_val < alpha)
  {
    p_conclusion = "Since \\(p < \\alpha = " + alph + "\\), we reject the null, as expected.";
    evidence_amt = "sufficient";
    evidence_amt_2 = "found enough";
  }
  else
  {
    p_conclusion = "Since \\(p \\geq \\alpha = " + alph + "\\), we cannot reject the null, as expected.";
    evidence_amt = "insufficient";
    evidence_amt_2 = "did not find enough";
  }

  a = document.getElementById("calculate_p");

  fillparams(a,[p_val_eq,p_val_applied,p_conclusion]);


  a = document.getElementById("test_conclusion");

  fillparams(a,[someone,evidence_amt,alt_desc,null_hyp,evidence_amt_2,alt_hyp]);


  MathJax.typeset();

  data = tData(df,samp_t0);
  lChart = (branch == "greater") ? Math.min(-3.5,samp_t0 - 0.1) : lower;
  uChart = (branch == "less") ? Math.max(3.5,samp_t0 + 0.1) : upper;
  makeChart(data,conf, 0, jStat.studentt.pdf(0,df) / 2, "t<sub>0</sub>", samp_t0,lChart,uChart);
}

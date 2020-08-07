
    var line = 0;
  
    // ----- check input
    function checkInput(){
      var input= document.getElementById("disease").value;
      var res= input.split(",");
      console.log(res)
      if(res.length <= 5 && input.length >0){
        document.getElementById('error_input').innerHTML ="";
      }
      else{
        document.getElementById('error_input').style.color = "#ff7d00";
        document.getElementById('error_input').innerHTML = "Invalid input"
      }
      return res.length <= 5 && input.length >0; 
  
    }
  
      //----- check dates
      function check(from, to, error){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    
        today = yyyy + '-' + mm + '-' + dd;
  
        if(document.getElementById(from).value!=="" && document.getElementById(to).value!==""){
          //both have values
          if(document.getElementById(to).value >= document.getElementById(from).value && document.getElementById(to).value <= today){
            document.getElementById(error).innerHTML = ""
            return true;
          }
          else{
            document.getElementById(error).style.color = "#ff7d00";
            document.getElementById(error).innerHTML = "Invalid dates"
            return false
          }
  
        }
        else{
          //either one empty
          document.getElementById(error).style.color = "#ff7d00";
          document.getElementById(error).innerHTML = "Please select a time period"
          return false
        }
    }
  
    // ----- submit-----
    function apply(){
      console.log("apply");
      var check_d = check("from", "to", "error_date");
      var check_i= checkInput();
      var table = document.getElementById("results");
      
      
      if(check_d && check_i){
          line ++;
          table.style.display = 'block'
          var listOfDiseases = document.getElementById("disease").value.split(",")
          console.log(listOfDiseases)
          var x = [];
          var i = 0;
  
          
  
          for (var disease of listOfDiseases){
            console.log(disease)
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
  
  
            cell1.innerHTML = disease;
            cell2.id = "articles_"+disease+line
            cell3.id = "year_"+disease+line
            articles(disease);
            year(disease);
  
          } 
      }
    }
  
    // ----- query year
    function year(input){
  
      
      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log("year_"+input)
            var str = this.responseText
            str = str.substring(1, str.length -1).replace('"','')
            str = str.replace('"','')
            document.getElementById("year_"+input+line).innerHTML = str.replace(':',' : ')
          }
      };
      xhttp.open("GET", "http://localhost:3000/year/"+input, true);
      xhttp.send();
          
    }
  
    // ----- query articles
    function articles(input){
      listOfInfo = ["from","to"];
      var str = input;
      for(id of listOfInfo){
        str += "/"+document.getElementById(id).value;
        
      }
      console.log(str) 
      //console.log(str.slice(0,-1));
      
      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("articles_"+input+line).innerHTML = this.responseText
          }
      };
      xhttp.open("GET", "http://localhost:3000/articles/"+str, true);
      xhttp.send();
          
    }
  
  
  
    // -----  clear 
    function clear_filter(){
        //console.log("clear");
    
        listToClear = ["from", "to" ,'disease'];
        listOfErrors = ["error_date",'error_input' ];
      
  
    
        var id;
        for( id of listToClear){
            document.getElementById(id).value = "";
        }
        for( id of listOfErrors){
            document.getElementById(id).innerHTML = "";
        }
    }
  
  
    // ----- Histogram -----
  
      function histog(){
      var check = checkHistogram()
      if (check){
        var disease = document.getElementById('histog').value;
        console.log("call hisog", disease);
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              histogram(this.responseText)
            }
        };
        xhttp.open("GET", "http://localhost:3000/histog/"+disease, true);
        xhttp.send();
      }
          
    }
  
      // ----- CHECK-----
      function checkHistogram(){
      var input= document.getElementById("histog").value;
  
      if(input.length >0){
        document.getElementById('error_input2').innerHTML ="";
      }
      else{
        document.getElementById('error_input2').style.color = "#ff7d00";
        document.getElementById('error_input2').innerHTML = "Please type a disease"
      }
      return input.length >0;
    }
  
    function histogram(input){
      console.log("histogram",input)
      var jsonRes = JSON.parse(input)
      var chart = new CanvasJS.Chart("myDiv", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title:{
        text: "Publications per year"
      },
      axisY: {
        title: "Count"
      },
      data: [{        
        type: "column",  
        showInLegend: true, 
        legendMarkerColor: "grey",
        legendText: "Year of publication ",
        dataPoints: jsonRes
      }]
    });
    chart.render();
    }
  
  
    
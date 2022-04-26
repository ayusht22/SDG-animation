

ld_coordinates=[]



yearOfData=['2018-19.csv','2019-20.csv','2020-21.csv']
years=['2018','2019','2020']
lineData={}
regionData={}
plotData=[]
regionData['x']=[]
regionData['y']=[]

lineData['x']=[]
lineData['y']=[]

ts0_coordinates={}
ts0_coordinates['x']=[]
ts0_coordinates['y']=[]

ts200_coordinates={}
ts200_coordinates['x']=[]
ts200_coordinates['y']=[]

ts500_coordinates={}
ts500_coordinates['x']=[]
ts500_coordinates['y']=[]

states=[]
states2=[]
states3=[]

plotData=[]
backgroundData=[]

progressLine=[]
barPlot={}

let init=async(url,year)=>{

let dat= await d3.csv(url).then((data)=>{

   
   // data=await loadData()
   
    x=[]
    y=[]
    
    sgds=[]

    console.log(data)
  
    

    for(let i=0;i<data.length;i++)
    {   
        //extract line data and region data

    
        
        let stateName=data[i]['State/UT']
        
      //  stateName=stateName.split(' ')
      //  stateName=stateName.join('')

        //storing barPlot info 
        let aspC=0
        let frontC=0
        let achieverC =0
        let performerC=0;
       
        if(year=='2018-19.csv')
        {
            if(i<5)
            {   
            
                if(data[i]['State/UT']=='line'){
                    let vals=data[i]['Coordinates'].split(",")
                    for(let j=0;j<vals.length;j++){
                    if(j%2==0) lineData['x'].push(vals[j]);
                    else lineData['y'].push(vals[j]);
                    }
                }
                else{
                        let x_cord=[]
                        let y_cord=[]
                        
                        let vals=data[i]['Coordinates'].split(",")
                    
                        for(let j=0;j<vals.length;j++){
                        if(j%2) y_cord.push(vals[j]);
                        else x_cord.push(vals[j]);
                        }
                        regionData['x'].push(x_cord)
                        regionData['y'].push(y_cord)

                }
                continue;
            }

            ts0_coordinates['x'].push(data[i]['MDS Col 1'])
            ts0_coordinates['y'].push(data[i]['MDS Col 2'])
            
            states.push(stateName)
            
        }
        else if(year=='2019-20.csv'){
           ts200_coordinates['x'].push(data[i]['MDS Col 1'])
           ts200_coordinates['y'].push(data[i]['MDS Col 2'])
           stateName+=" 2"
           states2.push(stateName)
        }
        else if(year=='2020-21.csv'){
            ts500_coordinates['x'].push(data[i]['MDS Col 1'])
           ts500_coordinates['y'].push(data[i]['MDS Col 2'])
           stateName+=" 3"
           states3.push(stateName)
        }
        // ld coordinates
        x.push(data[i]['MDS Col 1'])
        y.push(data[i]['MDS Col 2'])



        //counting bar heights for barplot
      
        for(let j=1;j<=16;j++){
          if(year=='2018-19.csv'&&j==12||j==13||j==14)continue
          if(year=='2019-20.csv'&&j==14)continue
          if(year=='2020-21.csv'&&j==14)continue

          if(data[i]['SDG '+j]<49){
            aspC++;
          }
          else if(data[i]['SDG '+j]<64){
            performerC++;
          }
          else if(data[i]['SDG '+j]<99){
            frontC++;
          }
          else{
            achieverC++;
          }
        }

        
        barPlot[stateName]=
          {
            x: ['Aspirants', 'Performers', 'Front Runners','Achievers'],
            y: [aspC, performerC,frontC,achieverC],
            type: 'bar',
            marker:{
              color:['#ea9393','#ffbf86','#95cf95','#87ceeb']
            },
            
          }
        


    

        
        tempColors=[]
        temp=[]
       
        var zoneLine = [
            {
            
                mode:'scatter',
                fill: 'tozeroy',
                fillcolor:'rgba(135, 206, 235,0.7)',
                showlegend:false,
            //    hoverinfo:'none',
                line:{
                    shape:'spline',
                    color:'rgb(135, 206, 235)'
                },
                x:regionData.x[0]
                    ,
                y:regionData.y[0],
                
            
                },
            
            {
            
                mode:'scatter',
                fill: 'tozeroy',
                fillcolor:'rgba(149, 207, 149,0.7)',
                showlegend:false,
            //    hoverinfo:'none',
                line:{
                    shape:'spline',
                    color:'rgb(149, 207, 149)'
                },       
                x:regionData.x[1],
                y:regionData.y[1],
                
            
                },
        
            {
            
                mode:'lines',
                fill: 'tozeroy',
                fillcolor:'rgba(255, 191, 134,0.7)',
                showlegend:false,
                hoverinfo:'none',
                line:{
                    shape:'spline',
                    color:'rgb(255, 191, 134)',
                },
                x:regionData.x[2],
                y:regionData.y[2],
                
            
            },
            {
                
                mode:'lines',
                fill: 'tozeroy',
                fillcolor:'rgba(234, 147, 147,0.7)',
                showlegend:false,
                //hoverinfo:'none',
                line:{
                    shape:'spline',
                    color:'rgb(234, 147, 147)',
                },
                x:regionData.x[3],
                y:regionData.y[3]
                
            },
        
            
           
           
        ]
       
        sgds.push(temp)
    }

    

    
    console.log(zoneLine)

if(year=='2018-19.csv'){


backgroundData.push(zoneLine[0],zoneLine[1],zoneLine[2],zoneLine[3])
plotData.push(zoneLine[0],zoneLine[1],zoneLine[2],zoneLine[3])
console.log(zoneLine)
console.log(plotData)
plotData.push(
    {
    type:'scatter',
    
    showlegend:false,
    
    line:{
        shape:'spline',
        color:'black'
    },
    hovertemplate:"%{x},%{y}"+"<extra></extra>",
    x:lineData.x,
    y:lineData.y
    }
)

backgroundData.push(
    {
    type:'scatter',
    
    showlegend:false,
    
    line:{
        shape:'spline',
        color:'black'
    },
    hovertemplate:"%{x},%{y}"+"<extra></extra>",
    x:lineData.x,
    y:lineData.y
    }
)
console.log(plotData)
}

return plotData
}

)


console.log(plotData)
}


var sliderSteps = [];
for (i = 0; i < years.length; i++) {
  sliderSteps.push({
    method: 'animate',
    label: years[i],
    args: [[years[i]], {
      mode: 'immediate',
      transition: {duration: 1000},
      frame: {duration: 1000, redraw: false},
    }]
  });
}





async function call(){
    await init("https://raw.githubusercontent.com/ayusht22/fao/master/Sustainability%20maps/2018-19.csv","2018-19.csv")
    await init("https://raw.githubusercontent.com/ayusht22/fao/master/Sustainability%20maps/2019-20.csv","2019-20.csv")
    await init("https://raw.githubusercontent.com/ayusht22/fao/master/Sustainability%20maps/2020-21.csv","2020-21.csv")

    distinctColors= ['#a9a9a9','#2f4f4f','#556b2f','#8b0000','#808000','#483d8b','#008000','#008b8b','#4682b4',
                '#000080','#d2691e','#9acd32','#daa520','#8fbc8f','#800080','#b03060','#ff0000','#ffff00','#00ff00',
                '#9400d3','#00ff7f','#dc143c','#00ffff','#0000ff','#ff00ff','#1e90ff','#f0e68c','#fa8072','#dda0dd',
                '#ff1493','#7b68ee','#afeeee','#ee82ee','#98fb98','#ffe4c4','#ffb6c1']

    /*--------------------------------------------------progress line-------------------------------------------------------------*/

    for(let i =0;i<36;i++){
        
        progressLine.push( {
       
          x: ts0_coordinates['x'][i],
          y: ts0_coordinates['y'][i],
          mode: 'lines+markers',
           line: {simplify: false},
          name:states[i],
          visible:'legendonly'
        })
        
      }
      
      for(let i=0;i<36;i++){
        progressLine.push( {
       
          x: [ts0_coordinates['x'][i],ts200_coordinates['x'][i]],
          y: [ts0_coordinates['y'][i],ts200_coordinates['y'][i]],
          mode: 'lines+markers',
          name:states[i],
          visible:'legendonly',
          line:{
            shape:'spline',
            dash:"dot",
            color:distinctColors[i]
          }
         
        })
      }
     
      for(let i=0;i<36;i++){
        progressLine.push( {
       
          x: [ts0_coordinates['x'][i],ts200_coordinates['x'][i],ts500_coordinates['x'][i]],
          y: [ts0_coordinates['y'][i],ts200_coordinates['y'][i],ts500_coordinates['y'][i]],
          mode: 'lines+markers',
          name:states[i],
          visible:'legendonly',
          line:{
            shape:'spline',
            dash:"dot",
            color:distinctColors[i]
          }
         
        })
      }



    /*-------------------------------------------------------frames for each step ----------------------------------------------*/

    
                
    var frames = [];
        
            frames.push({
            name: years[0],
            data: [{
                x: ts0_coordinates['x'],
                y: ts0_coordinates['y'],
                id: states,
                text: states,
                marker: {size: 10,
                sizemode: 'area',
                color: distinctColors
            
                },
                
                
            }
            ]}
            )       
            frames[0].data.push(backgroundData[0],backgroundData[1],backgroundData[2],backgroundData[3],backgroundData[4])    
            for (let i=0;i<36;i++) frames[0].data.push(progressLine[i])
            

            frames.push({
            name: years[1],
            data:[ {
                x: ts200_coordinates['x'],
                y: ts200_coordinates['y'],
                id: states,  
                text: states2,
                marker: {
                size: 10,
                sizemode: 'area',
                color:distinctColors
                },
                
            },
            
            ]
            })
            frames[1].data.push(backgroundData[0],backgroundData[1],backgroundData[2],backgroundData[3],backgroundData[4])

            for(let i=36;i<72;i++)frames[1].data.push(progressLine[i])
           
            frames.push({
            name: years[2],
            data:[ {
                x: ts500_coordinates['x'],
                y: ts500_coordinates['y'],
                id: states,
                text: states3,
                marker: {
                size: 10,
                sizemode: 'area',
                color:distinctColors
                
                },
        
        
            },
            
            ]
            })
            frames[2].data.push(backgroundData[0],backgroundData[1],backgroundData[2],backgroundData[3],backgroundData[4])

            for(let i=72;i<108;i++)frames[2].data.push(progressLine[i])
            
    
    console.log(progressLine)

    for(let i=0;i<36;i++){
        plotData.push({
            
            x: progressLine[i]['x'],
            y: progressLine[i]['y'],
            mode: 'lines+markers',
           
            
        })
        }
    plotData.unshift({

        x: ts0_coordinates['x'],
        y: ts0_coordinates['y'],
        mode: 'markers',
        id: states,
        text: states,
        
        marker: {
            size: 10,
            sizemode: 'area',
            color:distinctColors
                
        }
        })
    


    layout = {
        autosize:true,
        width:1200,
        height:600,
        
        xaxis: {range: [-0.1, 1.2],showgrid:false,'zeroline': false,visible:true},
        yaxis: {range: [-0.1, 1.2],showgrid:false,'zeroline': false,visible:true}, 
       // shapes: [],
        hovermode:'closest',
        margin: {
            l: 100,
            r: 100,
            b: 100,
          //  autoexpand:false,
            pad: 0
          },

        legend: {
        x: 1,
        y: 1,
        traceorder: 'normal',
        font: {
            family: 'sans-serif',
            size: 12,
            color: '#000'
        },
     //   bgcolor: '#E2E2E2',
    //    bordercolor: '#FFFFFF',
    //    borderwidth: 2,
        },

      
        showlegend:true,
            
        // We'll use updatemenus (whose functionality includes menus as
        // well as buttons) to create a play button and a pause button.
        // The play button works by passing `null`, which indicates that
        // Plotly should animate all frames. The pause button works by
        // passing `[null]`, which indicates we'd like to interrupt any
        // currently running animations with a new list of frames. Here
        // The new list of frames is empty, so it halts the animation.
         updatemenus: [{
           x: 0,
           y: 0,
           yanchor: 'top',
           xanchor: 'left',
           showactive: false,
           direction: 'left',
           type: 'buttons',
           pad: {t: 87, r: 10},
           buttons: [{
             method: 'animate',
             args: [null, {
               mode: 'immediate',
               fromcurrent: true,
               transition: {duration: 1000},
               frame: {duration: 1000, redraw: false}
             }],
             label: 'Play'
           }, {
             method: 'animate',
             args: [[null], {
               mode: 'immediate',
               transition: {duration: 0},
               frame: {duration: 0, redraw: false}
             }],
             label: 'Pause'
           }]
         }],
        
         sliders: [{
           pad: {l: 130, t: 55},
           currentvalue: {
             visible: true,
             prefix: 'Timestep:',
             xanchor: 'right',
             font: {size: 20, color: '#666'}
           },
           steps: sliderSteps
         }]
          
        }
    

    console.log(plotData)
    console.log(frames)

    console.log(barPlot)

    Plotly.newPlot(myDiv,{
        data:plotData,
        layout: layout,
        frames: frames,
        scrollZoom: true,
      })

      const modal = document.querySelector(".modal");



      function toggleModal() {
        modal.style.display = "block";
      }

      function windowOnClick(event) {
          if (event.target === modal) {
            modal.style.display = "none";
          }
      }

      //closeButton.addEventListener("click", toggleModal);
      window.addEventListener("click", windowOnClick);



      console.log(barPlot)

      var myPlot = document.getElementById('myDiv')
      myPlot.on('plotly_click', function(data){
      console.log(data)
        
      // c(barPlot[data['points'][0]['text']])
      toggleModal()
      d=document.getElementById('br')

      Plotly.react('bar', {
          data:[barPlot[data['points'][0]['text']]],
          layout:{title:{text:data['points'][0]['text']}}
      
      })

      
      });
  

}

call()

//plotData.push(lineData)

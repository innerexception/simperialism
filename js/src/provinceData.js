define(['candy'], function(Candy){
   return [
       {
           centerX:100,
           centerY:110,
           name: 'Bratlslava',
           height:200,
           width:200,
           edges:[
               {lineWidth:4, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:40, startY:35, endX:120, endY:60},
               {lineWidth:4, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:40, startY:35, endX:90, endY:200},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:90, startY:200, endX:140, endY:160},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:140, startY:160, endX:120, endY:60}
           ]
       },
       {
           centerX:225,
           centerY:80,
           name: 'Bumbdenburg',
           height:200,
           width:200,
           edges:[
               {lineWidth:4, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:120, startY:60, endX:290, endY:40},
               {lineWidth:4, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:290, startY:40, endX:280, endY:150},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:120, startY:60, endX:280, endY:150}
           ]
       },
       {
           centerX:190,
           centerY:150,
           name: 'Totalslava',
           height:200,
           width:200,
           edges:[
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:120, startY:60, endX:140, endY:160},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:140, startY:160, endX:90, endY:200},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:90, startY:200, endX:200, endY:210},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:200, startY:210, endX:280, endY:150},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:280, startY:150, endX:120, endY:60}
           ]
       }
   ];
});
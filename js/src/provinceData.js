define(['candy'], function(Candy){
   return [
       {
           name: 'Bratlslava',
           edges:[
               {lineWidth:'4', color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:40, startY:35, endX:120, endY:60},
               {lineWidth:'4', color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:120, startY:60, endX:140, endY:160},
               {lineWidth:'2', color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:140, startY:160, endX:90, endY:200},
               {lineWidth:'2', color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:90, startY:200, endX:40, endY:35}
           ]
       },
       {
           name: 'Bumbdenburg',
           edges:[
               {lineWidth:4, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:120, startY:60, endX:290, endY:40},
               {lineWidth:4, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:290, startY:40, endX:280, endY:150},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:280, startY:150, endX:120, endY:60}
           ]
       },
       {
           name: 'Totalslava',
           edges:[
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:120, startY:60, endX:140, endY:160},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:140, startY:160, endX:90, endY:200},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:90, startY:200, endX:200, endY:210},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:200, startY:210, endX:280, endY:150},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:280, startY:150, endX:120, endY:60}
           ]
       },
       {
           name: '',
           edges:[
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:90, startY:200, endX:60, endY:350},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [20,6,20], startX:60, startY:350, endX:160, endY:420},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:160, startY:420, endX:90, endY:200}
           ]
       },
       {
           name: '',
           edges:[
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:90, startY:200, endX:200, endY:210},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:200, startY:210, endX:210, endY:330},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:210, startY:330, endX:160, endY:420},
               {lineWidth:2, color:Candy.gameBoyPalette.darkBlueGreen, lineDash: [6,6,2], startX:160, startY:420, endX:90, endY:200}
           ]
       }
   ];
});
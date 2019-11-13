these fields should exists for every json in items array: 

1. matadata.name
2. metadata.annotations.lifecycleStage
3. spec.spec.conatiners[0].name
4. spec.spec.conatiners[0].image


If any of them are missing then put them in array like this : 


 [
      {
        name : matadata.name,
        missing :   "deployment is missing lifecycleStage" 
  },
  {
    name : matadata.name,
    missing :   "deployment is missing image"  
},

]



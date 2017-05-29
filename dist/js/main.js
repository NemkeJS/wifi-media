	
var app = angular.module('App',['angularUtils.directives.dirPagination']);
app.controller('mainCtrl',function($scope,$http,$timeout){
		//sorting and filtering 
		$scope.cort = true;

		$scope.sort = function(keyname){
            $scope.sortKey = keyname;   
            $scope.toggle = !$scope.toggle; 
        }

        $scope.dropdown = function(keydownname) {
          $scope.sortKeyer = keydownname;
      }
		//get fake mockup
		$http.get('dist/js/mockup.json',function(data){
			return data;	
		}).then(function(response){
			$scope.tags = response.data;
			$scope.subtype  = $scope.tags.map(function(item){
				return item.tag_type;
			}).filter(function(filt,i,currentArray){
				return currentArray.indexOf(filt) == i;
			});	
			console.log($scope.subtype);
		})
		.catch(function(reason) {
			$scope.err = reason;
		});

       $scope.states = '5 10 15 20 25 30 35 40 All'.split(' ').map(function (state) {
          return { abbrev: state };
      });	
       
       $scope.editEnabled =  false;


       $scope.editData=function(){
        $scope.editEnabled = true;

    };

    $scope.cancleData=function(){
        $scope.editEnabled = false;
    };
    
    $scope.saveData=function(){
        $scope.editEnabled = false;
        if(($scope.editname != " ") || ($scope.editname.length = 0)) {	

            $scope.obj = {
        //id:$scope.routeId.id,	
        tag_name:$scope.editname,
        tag_type:$scope.edittagtype,
        my_feed:$scope.editmy_feed,
        my_favourites:$scope.editmyfavourites,
        img:'dist/img/sport.jpg',
    }
    $scope.tags.filter(function(item,i){
        if(item.id === $scope.obj.id) {
        	item=$scope.obj;
            $scope.tags.splice(i, 1);
            $scope.tags.push($scope.obj);
            $scope.$apply();
            
        }
    });
    $scope.message = "Succesful record";
}
else {
   $scope.message = "Error record";

}
$scope.display();
$scope.add();
};

$scope.saveDatar=function() {
    if(($scope.newname != " ") || ($scope.newname.length = 0)) {	
       $scope.tags.push({
           id:$scope.tags.length+1,	
           tag_name:$scope.newname,
           tag_type:$scope.newtagtype,
           my_feed:$scope.new_feed,
           my_favourites:$scope.new_favourites,
           image: $scope.thumbnail.dataUrl,
       });
       $scope.message = "Succesful record"
   }
   else {
       $scope.message = "Please fill necessary field"
       
   }
   $scope.display();


}
$scope.deleteRow = function (e) { 
  if(confirm("Are you sure")) {		             
    angular.element(e.target).parent().parent().remove(); 
    $scope.message  = "Succesful record";
}
else {
    $scope.message  = "Error occured";
}
$scope.display();
};  

$scope.display = function() {
    $scope.alertDisplayed = true;
    $timeout(function() {
        $scope.alertDisplayed = false;
    }, 2000)
};



$scope.thumbnail = {
    dataUrl: 'adsfas'
};
$scope.fileReaderSupported = window.FileReader != null;
$scope.photoChanged = function(files){
   $scope.imager = true;
   if (files != null) {
    var file = files[0];
    if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
        $timeout(function() {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) {
                $timeout(function(){
                   $scope.thumbnail.dataUrl = e.target.result;
               });
            }
        });
    }
}
};




});
   
  

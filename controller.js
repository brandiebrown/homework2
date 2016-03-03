/*var quizModule = angular.module('QuizProgram', []);

quizModule.controller('QuizProgramController', ['$scope', 'studentListService', 'questionListService', 'LocalStorageService',
    function ($scope, studentListService, questionListService, LocalStorageService) {

        var qpc = this;

        qpc.students_completed = [];

        //use service here
        qpc.questions = [];
        qpc.questions_completed = [];
        studentListService.getStudentList().then(function(response) {
            qpc.students=response.people;
        });
        questionListService.getQuestion().then(function(response) {
        
            qpc.questions=response.questions; 
           // alert(response.questions);
            
        });
            

        qpc.getNextQuestion = function() {

            if (qpc.questions.length > 0) {
                var index = Math.floor(Math.random() * qpc.questions.length);

                qpc.selected_question = qpc.questions[index];

                qpc.questions_completed.push(qpc.selected_question);

                //read about splice here: http://www.w3schools.com/jsref/jsref_obj_array.asp
                qpc.questions.splice(index, 1);
            }
            else {
                qpc.questions = qpc.questions_completed;
                qpc.questions_completed = [];
            }

        };

        qpc.getNextStudent = function() {
            //alert("function");

            if (qpc.students.length > 0) {
                var index = Math.floor(Math.random() * qpc.students.length);
                //alert("if");
                qpc.selected_student = qpc.students[index];

                qpc.students_completed.push(qpc.selected_student);

                qpc.students.splice(index, 1);
            }
            else {
               // alert("else");
                qpc.students = qpc.students_completed;
                qpc.students_completed = [];
            }
        };

        qpc.getNext = function() {
            //qpc.getNextQuestion();
            qpc.getNextStudent();
        };

        qpc.doCorrect = function() {
            
            qpc.selected_student.correct++;
            qpc.getNext();
        };

        qpc.doIncorrect = function() {
            
            qpc.selected_student.incorrect++;
            qpc.getNext();
        };

        //use service here
        //not correct 
     //  (LocalStorageService.getData('people')!==nul) ? 
      // JSON.parse(json,qpc._completed)
        
        

     qpc.getStudents = function() {
            studentListService.getStudentList()
                .then(
                    //what to do if $http.get was successful
                    function(response){
                        console.log(response.data);
                        qpc.students = response.data;
                        qpc.getNextStudent();
                    },
                    //what to do if $http.get was unsuccessful            
                    function(response){
                        console.log(response);
                        qpc.students = [];
                    }
                );
        };

        //we actually need to get these students now
       qpc.getStudents();
        

    }
]);

///// STUDENT LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('studentListService', ['$http', function($http) {

    //factory allows us to specify an object to send back
    var studentListService = {};

    //get current rest conditions
    studentListService.getStudentList = function() {
        return $http.get("students.json") .then(function(response){
            return response.data;
        });
    };

    return studentListService;
}]);

///// QUESTION LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('questionListService', ['$http', function($http) {

    //factory allows us to specify an object to send back
    var questionListService = {};

    //get current rest conditions
    questionListService.getQuestion = function() {
        return $http.get("questions.json") .then(function(response){
            //alert(response.data);
            return response.data;
        });
    };

    return questionListService;
}]);


quizModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('my-storage');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});


 */ 
var quizModule = angular.module('QuizProgram', []);

quizModule.controller('QuizProgramController',
    ['$scope', 'studentListService', 'questionListService', 
        function($scope, studentListService, questionListService){
    
    var qpc = this;

    qpc.students_completed = [];
    
    //use service here
    qpc.questions = [];
    qpc.questions_completed = [];
    
    qpc.getNextQuestion = function(){
        
        if(qpc.questions.length > 0){
            var index = Math.floor(Math.random() * qpc.questions.length);
            
            qpc.selected_question = qpc.questions[index];
            
            qpc.questions_completed.push(qpc.selected_question);
            
            //read about splice here: http://www.w3schools.com/jsref/jsref_obj_array.asp
            qpc.questions.splice(index, 1);            
        }
        else{
            qpc.questions = qpc.questions_completed;
            qpc.questions_completed = [];
        }

    }
    
    qpc.getNextStudent = function(){
        
        if(qpc.students.length > 0){
            var index = Math.floor(Math.random() * qpc.students.length);
             
            qpc.selected_student = qpc.students[index];
             
            qpc.students_completed.push(qpc.selected_student);
             
            qpc.students.splice(index, 1);
        }
        else{
            qpc.students = qpc.students_completed;
            qpc.students_completed = [];
        }
    }
    
    qpc.getNext = function(){
        qpc.getNextQuestion();
        qpc.getNextStudent();
    }
    
    qpc.doCorrect = function(){
        qpc.selected_student.correct++;
        qpc.getNext();
    }
    
    qpc.doIncorrect = function(){
        qpc.selected_student.incorrect++;
        qpc.getNext();        
    }
    
    //use service here
  // window.localStorage.set("storage", JSON.stringify());
    
    
    qpc.getStudents = function(){
        studentListService.getStudentList()
        .then(
            //what to do if $http.get was successful
            function(response){
                console.log(response.data);
                qpc.students = response.data;
                //qpc.getNext();
                qpc.getNextStudent();

            },
            //what to do if $http.get was unsuccessful            
            function(response){
                console.log(response);                
                qpc.students = [];
            }
        );
    }
    

    //we actually need to get these students now
    //qpc.getNext();
    qpc.getStudents(); 
    
      qpc.getQuestions = function(){
        questionListService.getQuestion()
        .then(
            //what to do if $http.get was successful
            function(response){
                console.log(response.data);
                qpc.questions = response.data;
                //qpc.getNext();
                qpc.getNextQuestion();

            },
            //what to do if $http.get was unsuccessful            
            function(response){
                console.log(response);                
                qpc.questions = [];
            }
        );
    }
    qpc.getQuestions();

}]);

///// STUDENT LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('studentListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var studentListService = {};

    //get current rest conditions
    studentListService.getStudentList = function(){
        return $http.get("students.json");
    };
    
    return studentListService;
}]);

///// QUESTION LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('questionListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var questionListService = {};

    //get current rest conditions
    questionListService.getQuestion = function(){
        return $http.get("questions.json");
    };
    
    return questionListService;
}]);


quizModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('my-storage');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});
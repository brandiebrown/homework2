var quizModule = angular.module('QuizProgram', ['localStorage']);

quizModule.controller('QuizProgramController', ['$scope', 'studentListService', 'questionListService', 'resultsListService',
    function ($scope, studentListService, questionListService, resultsListService) {

        var qpc = this;

        qpc.students_completed = [];

        //use service here
        qpc.questions = [];
        qpc.questions_completed = [];

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

        }

        qpc.getNextStudent = function() {

            if (qpc.students.length > 0) {
                var index = Math.floor(Math.random() * qpc.students.length);

                qpc.selected_student = qpc.students[index];

                qpc.students_completed.push(qpc.selected_student);

                qpc.students.splice(index, 1);
            }
            else {
                qpc.students = qpc.students_completed;
                qpc.students_completed = [];
            }
        }

        qpc.getNext = function() {
            qpc.getNextQuestion();
            qpc.getNextStudent();
        }

        qpc.doCorrect = function() {
            var Correct = localStorage.getItem('selected_student.correct')
            qpc.selected_student.correct++;
            qpc.getNext();
        }

        qpc.doIncorrect = function() {
            var Incorrect = localStorage.getItem('selected_student.incorrect')
            qpc.selected_student.incorrect++;
            qpc.getNext();
        }

        //use service here
        localStorage.setItem('quizresults', selected_student.correct);
        localStorage.setItem('students_completed', students);
        

        qpc.getStudents = function() {
            studentListService.getStudentList()
                .then(
                    //what to do if $http.get was successful
                    function(response) {
                        console.log(response.data);
                        qpc.students = response.data;
                        qpc.getNext();
                    },
                    //what to do if $http.get was unsuccessful            
                    function(response) {
                        console.log(response);
                        qpc.students = [];
                    }
                );
        }


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
        return $http.get("students.json");
    };

    return studentListService;
}]);

///// QUESTION LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('questionListService', ['$http', function($http) {

    //factory allows us to specify an object to send back
    var questionListService = {};

    //get current rest conditions
    questionListService.getQuestion = function() {
        return $http.get("questions.json");
    };

    return questionListService;
}]);
///// RESULTS LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('resultsListService', ['$http', function($http) {

    //factory allows us to specify an object to send back
    var resultsListService = {};

    //get current rest conditions
    resultsListService.getResultsList = function() {
        return $http.get("students.json");
    };

    return resultsListService;
}])

.config(['localStorageProvider', function(localStorageProvider){
    localStorageProvider.setPrefix('quizresults');
    
}]);
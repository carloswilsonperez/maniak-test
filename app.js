(function () {
    'use strict';

    var app = angular.module('myApp', []);
    //app.service('getBooks', getBooksService);

    app.controller('myCtrl', function ($scope) {
        $scope.firstName = "John";
        $scope.lastName = "Doe";
        $scope.addNewBook = false;
        $scope.modalOpen = false;
        $scope.toggleNewBookSection = function (index) {
            $scope.addNewBook = !$scope.addNewBook;
            $scope.editionMode = false;
            $scope.newName = '';
            $scope.newAuthor = '';
            $scope.newCathegory = '';
            $scope.newDate = '';
            $scope.nameHasError = false;
            $scope.authorHasError = false;
            $scope.cathegoryHasError = false;
            $scope.dateHasError = false;
            return $scope.addNewBook;
        };
        $scope.openModal = function(index) {
            if ($scope.books[index].available) {
                return;
            }
            $scope.modalOpen = true;
            $scope.bookToFree = index;
        };
        $scope.closeModal = function() {
            $scope.modalOpen = false;
        };
        $scope.freeBook = function() {
            $scope.modalOpen = false;
            $scope.books[$scope.bookToFree].available = true;
        };
        $scope.editBook = function(index) {
            $scope.indexToEdit = index;
            $scope.addNewBook = $scope.toggleNewBookSection();
            $scope.newName = $scope.books[index].name;
            $scope.newAuthor = $scope.books[index].author;
            $scope.newCathegory = $scope.books[index].cathegory;
            $scope.newDate = $scope.books[index].date;
            $scope.editionMode = true;
        };
        $scope.removeBook = function (index) {
            $scope.books.splice(index, 1);
        };
        $scope.addBook = function () {
            if (!$scope.newName || !$scope.newAuthor || !$scope.newCathegory || !$scope.newDate) {
                if (!$scope.newName) {
                    $scope.nameHasError = true;
                }
                if (!$scope.newAuthor) {
                    $scope.authorHasError = true;
                }
                if (!$scope.newCathegory) {
                    $scope.cathegoryHasError = true;
                }
                if (!$scope.newDate) {
                    $scope.dateHasError = true;
                }

                return;
            }

            $scope.edition.name.$touched = false;
            $scope.edition.author.$touched = false;
            $scope.edition.cathegory.$touched = false;
            $scope.edition.date.$touched = false;
            var newBook = {};
            newBook.name = $scope.newName;
            newBook.author = $scope.newAuthor;
            newBook.cathegory = $scope.newCathegory;
            newBook.date = $scope.newDate;

            if ($scope.editionMode) {
                $scope.books[$scope.indexToEdit] = newBook;
            } else {
                newBook.available = true;
                $scope.books.push(newBook);
            }
            $scope.newName = '';
            $scope.newAuthor = '';
            $scope.newCathegory = '';
            $scope.newDate = '';
            $scope.addNewBook = false;
            $scope.editionMode = false;
        };
        $scope.categories = ['Drama', 'Comedy', 'Fiction', 'Engineering', 'History'];
        $scope.books = [{
            name: "Fundamentos de Android",
            author: "Joyanes, Luis",
            cathegory: "Fiction",
            date: "2008",
            available: true
        },
        {
            name: "Tom Sawyer",
            author: "Twain, Mark",
            cathegory: "Drama",
            date: "2012",
            available: false
        },
        {
            name: "El Principito",
            author: "Saint Exupery, Antoine De",
            cathegory: "Comedy",
            date: "2014",
            available: true
        }
        ];
    });


})();
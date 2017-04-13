'use strict';

angular.module('angularJSNgRepeatHashKey')
    .controller('HomeCtrl', function ($scope, $timeout) {

        $scope.allTodos = [
            {
                idx: 0,
                name: 'Todo 1',
                picture: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Hand_wash_dishes.jpeg'
            },
            {
                idx: 1,
                name: 'Todo 2',
                picture: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Early_back-to-school_display_at_Walmart%2C_Kingston%2C_NY.jpg'
            },
            {
                idx: 2,
                name: 'Todo 3',
                picture: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Women_grocery_shopping.jpg'
            },
            {
                idx: 3,
                name: 'Todo 4',
                picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Man_grocery_shopping.jpg/1280px-Man_grocery_shopping.jpg'
            },
            {
                idx: 4,
                name: 'Todo 5',
                picture: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Fredmeyer_edit_1.jpg'
            },
            {
                idx: 5,
                name: 'Todo 6',
                picture: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Laundry_in_Paris.jpg'
            },
            {
                idx: 6,
                name: 'Todo 7',
                picture: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/India_-_Varanasi_-_031_-_laundry_on_the_ghats_%282146294851%29.jpg'
            },
            {
                idx: 7,
                name: 'Todo 8',
                picture: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Woman_doing_laundry.jpg'
            }
        ];

        $scope.activeTodos = $scope.allTodos.slice(0, 6);
        $scope.resolvedTodos = [];

        $scope.markFirst = function() {
            $timeout(function() {
                $('.first').css('color', 'lightgreen');
            }, 500);
        };
        $scope.markFirst();

        $scope.defer = function() {
            // Deleting one item from the beginning of the active list
            var deferredTodo = $scope.activeTodos.splice(0, 1)[0];
            // Deleting hashKey, so that ngRepeat re-renders the corresponding element
            delete deferredTodo.$$hashKey;
            // Choosing the index, where to move the item - it is either 3, or the last index of the array (if it is less than 3)
            var newIndex = Math.min(3, $scope.activeTodos.length);
            $scope.activeTodos.splice(newIndex, 0, deferredTodo);
            // Since first item in the list change, we want to execute our delayed UI function
            $scope.markFirst();
        };

        $scope.resolved = function() {
            // Deleting one item from the beginning of the active list
            var resolved = $scope.activeTodos.splice(0, 1);
            // Pushing this item to the resolved list
            $scope.resolvedTodos.push(resolved[0]);
            // If number of items in active and resolved lists is less than number of items in ALL list,
            // then there is still something we can add to the active list, so we look for that one item
            // and (if found) append it to the active list
            if ($scope.allTodos.length > ($scope.activeTodos.length + $scope.resolvedTodos.length)) {
                // Our goal is not optimize it, so we do stupid full scan here
                for (var i = 0; i < $scope.allTodos.length; i++) {
                    if ($scope.activeTodos.indexOf($scope.allTodos[i]) < 0 && $scope.resolvedTodos.indexOf($scope.allTodos[i]) < 0) {
                        // If there is an item, which is not active and not resolve, we add to the list of active items
                        $scope.activeTodos.push($scope.allTodos[i]);
                        // We need only one
                        break;
                    }
                }
            }
            // Since first item in the list change, we want to execute our delayed UI function
            $scope.markFirst();
        };
    });

angular.module('angularJSNgRepeatHashKey')
    .directive('trackElementChanges', function() {
        return function(scope, element, attrs) {
            console.log(attrs['id']);
        };
    });
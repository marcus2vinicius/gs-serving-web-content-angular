# Sample using spring-boot and thymeleaf with angularjs
###### based in Serving Web Content with Spring
https://spring.io/guides/gs/serving-web-content

#### Runing
```sh
$ mvn install
```
```
$ mvn spring-boot:run
```
##### Access url
```
http://localhost:8080/greeting
```

#### Validation of Fields required
##### in view

```html
<input type="number" name="id" placeholder="Id" class="form-control" ng-model="item.id" ng-required="true"/>
<div ng-show="form.id.$invalid">
    <p class="help-block"
       ng-show="form.id.$error.required">
        Required Field
    </p>
</div>
```
##### Back-end

Item.java

```java
    @NotNull(message = "Id is required!")
    private Integer id;
```
GreetingController.java
```java
    @RequestMapping(value = "/greeting/saveItem",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveItem(@Valid @RequestBody Item item) {
```
> note the @Valid

Response in view
```js
$scope.saveItem = function (item) {
    $http.post('/greeting/saveItem', item)
        .then(function (data, status, headers, config) {
            console.log("Item Sent");
        },function (result) {
            console.log(result.data.errors);
            result.data.errors.forEach(function (error) {
                $scope.messageError += error.defaultMessage+"\n";
            });
        });
};
```



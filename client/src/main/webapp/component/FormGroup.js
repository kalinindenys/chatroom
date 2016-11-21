var FormGroupComponent = function (rootComponentId, name, placeholder, commandBus) {

    var updateFormGroup = function (childInfo) {
        var parent = $("#" + childInfo.id).parent();

        if (childInfo.hasError) {
            parent.attr("class", "form-group has-error");
            parent.append(
                '<p class="text-danger">' + childInfo.errorMessage + '</p>');
        } else {
            parent.attr("class", "form-group");
        }
    };

    commandBus.subscribe(Commands.UPDATE_FORM_GROUP, updateFormGroup);

};
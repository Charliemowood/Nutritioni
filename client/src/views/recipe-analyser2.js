// All the methods have been ordered for readability

// 1. UI components
// 2. Event handlers
// 3. Callbacks
// 4. Helper mothods

var RecipeRequest = require('../apis/recipe-analysis-request.js');

var RecipeAnalyser = function() {
  // state holders
  this.selectedRecipe = null;
  this.newRecipeData = null;

  // we will watch these for events
  this.form = null;
  this.addExtraIngredientButton = null;
  this.saveRecipeButton = null;
  this.clearFormButton = null;
  this.savedRecipesSelect = null;

  // create ui
  this.render();
  // this.initializeDropdown();
  // this.setEventListeners();

}

RecipeAnalyser.prototype = {

  render: function() {
    var main = document.createElement('main');
    main.id = 'recipe-analyser';

    var savedRecipesContainer = this.createSavedRecipesContainer();

    var mainContent = this.createMainContent();

    main.appendChild(savedRecipesContainer);
    main.appendChild(mainContent);

    document.body.appendChild(main);
  },

  //UI COMPONENTS

  createSavedRecipesContainer: function() {
    var container = this.createDiv('saved-recipes');

    var dropdownContainer = this.createDiv('dropdown-container');

    var label = this.createDropdownLabel();

    this.savedRecipesSelect = this.createSelect();

    dropdownContainer.appendChild(label);
    dropdownContainer.appendChild(this.savedRecipesSelect);
    container.appendChild(dropdownContainer);

    return container;
  },

  createDropdownLabel: function() {
    var label = document.createElement('label');
    label.setAttribute('for', 'saved-recipes');
    label.innerText = 'Saved Recipes:';

    return label;
  },

  createSelect: function() {
    var select = document.createElement('select')
    select.name = 'saved-recipes';
    select.id = 'saved-recipes-dropdown';

    return select;
  },

  // Main Content Div

  createMainContent: function() {
    var mainContentContainer = this.createDiv('main-content');

    var form = this.createForm();

    var chartContainers = this.createChartContainers();

    mainContentContainer.appendChild(form);
    mainContentContainer.appendChild(chartContainers);

    return mainContentContainer;
  },

  createForm: function() {
    var form = document.createElement('form');
    form.action = '/';
    form.method = 'post';

    var formInputLinesDiv = this.createFormInputLinesDiv();

    var buttonsContainer = this.createButtonsContainer();

    form.appendChild(formInputLinesDiv);
    form.appendChild(buttonsContainer);

    return form;
  },

  createFormInputLinesDiv: function() {
    var formInputLinesDiv = this.createDiv('form-input-lines');

    var titleFormSection = this.createTitleFormSection();

    var ingredientsFormSection = this.createIngredientsFormSection();

    formInputLinesDiv.appendChild(titleFormSection);
    formInputLinesDiv.appendChild(ingredientsFormSection);

    return formInputLinesDiv;
  },

  createTitleFormSection: function() {
    var titleFormSection = document.createElement('div');
    titleFormSection.classList.add('title');
    titleFormSection.classList.add('form-section');

    var label = this.createTitleLabel();

    var input = this.createTitleInput();

    titleFormSection.appendChild(label);
    titleFormSection.appendChild(input);

    return titleFormSection;
  },

  createTitleLabel: function() {
    var label = document.createElement('label');
    label.setAttribute('for', 'title');
    label.innerText = 'Title:';

    return label;
  },

  createTitleInput: function() {
    var input = document.createElement('input');
    input.id = 'title';
    input.classList.add('input-textbox');
    input.type = 'text';

    return input;
  },

  createIngredientsFormSection: function() {
    var ingredientsFormSection = document.createElement('div');
    ingredientsFormSection.classList.add('ingredients');
    ingredientsFormSection.classList.add('form-section');

    var label = this.createIngredientLabel();

    var ingredientInputsDiv = this.createIngredientInputsDiv();

    ingredientsFormSection.appendChild(label);
    ingredientsFormSection.appendChild(ingredientInputsDiv);

    return ingredientsFormSection;
  },

  createIngredientLabel: function() {
    var label = document.createElement('label');
    label.setAttribute('for', 'ingredients');
    label.innerText = 'Ingredients:';
    return label;
  },

  createIngredientInputsDiv: function() {
    var container = this.createDiv('ingredient-inputs');

    var input = this.createInitialIngredientInput();

    this.addExtraIngredientButton = this.createAddExtraIngredientButton();

    container.appendChild(input);
    container.appendChild(this.addExtraIngredientButton);

    return container;
  },

  createInitialIngredientInput: function() {
    var input = document.createElement('input');
    input.id = 'ingredients';
    input.classList.add('input-textbox');
    input.type = 'text';

    return input;
  },

  createAddExtraIngredientButton: function() {
    var button = document.createElement('button');
    button.id = 'add-extra-ingredient';
    button.type = 'button';
    button.innerText = '+';

    return button;
  },

  createButtonsContainer: function() {
    var container = this.createDiv('buttons-container');

    var input = this.createAnalyseRecipeButton();

    this.clearFormButton = this.createButton('Clear Data');

    this.saveRecipeButton = this.createButton('Save Recipe');

    container.appendChild(input);
    container.appendChild(this.clearFormButton);
    container.appendChild(this.saveRecipeButton);

    return container;
  },

  createAnalyseRecipeButton: function() {
    var button = document.createElement('input');
    button.type = 'submit';
    button.value = 'Analyse Recipe';

    return button;
  },

  createButton: function(innerText) {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerText = innerText;

    return button;
  },

  createChartContainers: function() {
    var container = this.createDiv('chart-containers');

    var pieChartContainer = this.createDiv('pie-chart');

    var columnChartContainer = this.createDiv('column-chart');

    container.appendChild(pieChartContainer);
    container.appendChild(columnChartContainer);

    return container;
  },

  createDiv: function(id) {
    var div = document.createElement('div');
    div.id = id;

    return div;
  },



  // EVENT HANDLERS
  setEventListeners: function() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.addExtraIngredientButton.addEventListener('click', this.)
    // this.saveRecipeButton = null;
    // this.clearFormButton = null;
    // this.savedRecipesSelect = null;
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var ingredients = this.getIngredientsFromInputs();

    var data = {
      title: this.form['title'].value,
      ingr: ingredients
    }
    this.newRecipeData = data;
    this.newRecipeData.nutritionalInformation = [];
    var request = new RecipeRequest();
    request.makePostRequest(data);
  },

  handleAddExtraIngredientInputClick: function() {
    var input = document.createElement('input');
    input.type = "text";
    input.classList.add("input-textbox");
    input.classList.add("extra-ingredient");
    var container = document.querySelector('#ingredient-inputs');
    container.insertBefore(input, container.children[container.children.length -1]);
  },



  // HELPER FUNCTIONS

  getIngredientsFromInputs: function() {
    var ingredientInputs = document.querySelectorAll('#ingredient-inputs input');
    var ingredients = [];

    for (var i = 0; i < ingredientInputs.length; i++) {
      var ingredient = ingredientInputs[i].value;
      if (ingredient !== "") ingredients.push(ingredient);
    }
    return ingredients;
  }

}

module.exports = RecipeAnalyser;

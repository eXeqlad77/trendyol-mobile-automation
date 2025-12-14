Feature: E-Commerce Simple Shopping Flow

  Scenario: Add, Verify, and Remove "Nutella" Product from Cart
    Background:
      Given the user is on the Home Page and ready to search

    When the user types "nutella" into the search field and performs a search
    
    Then all product names in the results list should contain "nutella"
    And the user selects the 2nd product from the list and saves its price
    
    When the product name on the product detail page contains "nutella"
    And the user clicks the add to cart button
    
    And the user navigates to the Cart page
    
    Then the user should see the added product name in the cart
    And the product price in the cart should match the saved price
    
    When the user removes the product from the cart
    Then the user should see that the cart is empty
Feature: Create Organization
	In order to have a ministry in the system
	As a ministry leader
	I want to create an organization

Scenario: Create Organization
	Given my organization is not registered
	And I am a new user
	When I want to sign up
	Then I should navigate to the sign up page
	And enter required information for my organization
	And enter a unique hostname for my organization
	And click "Create"

Scenario: Attempt to Use a Preregistered Hostname
	Given my organization is not registered
	And I am a new user
	And I want to sign up
	When I should navigate to the sign up page
	And enter required information for my organization
	And enter a hostname for my organization that is already in use
	And click "Create"
	Then I should receive an error message

Scenario: Attempt to Use an Email Address Already Registered For Creating a New Organization on Main Sign Up Page
	Given my organization is not registered
	But my email address is already registered
	When I want to add my organization
	And navigate to the sign up page
	And enter required information for my organization
	And click "Create"
	Then I should recieve a message to add my organization within my acount

Scenario: Create an Organization From within My Account
	Given my organization is not registered
	But my email address is already registered
	When I want to add my organization
	Then I should navigate to the organizations page in my account
	And enter required information for my organization
	And click "Create"
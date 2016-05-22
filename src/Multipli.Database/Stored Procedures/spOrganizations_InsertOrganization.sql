CREATE PROCEDURE [dbo].[spOrganizations_InsertOrganization]
	@Name			NVARCHAR(1024),
	@Hostname		NVARCHAR(25),
	@IsAuthorized	BIT = 0
AS
	-- Setup resulting table
	DECLARE @urls TABLE (
	    OrganizationId			UNIQUEIDENTIFIER
	   ,OrganizationName		NVARCHAR(1024)
	   ,OrganizationHostname	NVARCHAR(25)
	   ,OrganizationCustomUrl	NVARCHAR(1024)
	   ,LocationId				UNIQUEIDENTIFIER
	   ,LocationName			NVARCHAR(1024)
	   ,LocationHostname		NVARCHAR(25)
	   ,LocationCustomUrl		NVARCHAR(1024)
	);
	
	-- Get urls that match hostname
	INSERT INTO @urls
	EXEC [dbo].[spOrganizationLocations_FindUrl] @Hostname = @Hostname;

	-- Find (count) any pre-existing organizations with that hostname that is not the current organization
	DECLARE @Count INT;
    SELECT @Count = COUNT(OrganizationId) FROM @urls;

	IF @Count = 0
	BEGIN
		INSERT INTO [dbo].[tblOrganizations] (
			Id
		   ,Name
		   ,Hostname
		   ,IsAuthorized
		   ,CreatedDate
			)
		SELECT 
			NEWID()
		   ,@Name
		   ,@Hostname
		   ,@IsAuthorized
		   ,GETUTCDATE();

		SELECT 1;
	END
	ELSE
	BEGIN
		SELECT 0;
	END

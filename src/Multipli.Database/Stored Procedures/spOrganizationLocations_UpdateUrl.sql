CREATE PROCEDURE [dbo].[spOrganizationLocations_UpdateUrl]
	@OrganizationId	UNIQUEIDENTIFIER = NULL,
	@LocationId		UNIQUEIDENTIFIER = NULL,
	@CustomUrl		NVARCHAR(1024)
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
	EXEC [dbo].[spOrganizationLocations_FindUrl] @CustomUrl = @CustomUrl;

	DECLARE @Count INT;

	IF @OrganizationId IS NOT NULL
	BEGIN
		SELECT @Count = COUNT(OrganizationId) FROM @urls
		WHERE 
			(OrganizationId <> @OrganizationId AND
			 OrganizationCustomUrl = @CustomUrl) OR
			(LocationCustomUrl = @CustomUrl);
			
		IF @Count = 0
		BEGIN
			UPDATE [dbo].[tblOrganizations]
			SET
				CustomUrl = @CustomUrl
			WHERE
				Id = @OrganizationId;

			SELECT 1;
		END
		ELSE
		BEGIN
			SELECT 0;
		END
	END
	ELSE IF @LocationId IS NOT NULL
	BEGIN
		SELECT @Count = COUNT(LocationId) FROM @urls
		WHERE 
			(LocationId <> @LocationId AND
			 LocationCustomUrl = @CustomUrl) OR
			(OrganizationCustomUrl = @CustomUrl);
			
		IF @Count = 0
		BEGIN
			UPDATE [dbo].[tblLocations]
			SET
				CustomUrl = @CustomUrl
			WHERE
				Id = @LocationId;

			SELECT 1;
		END
		ELSE
		BEGIN
			SELECT 0;
		END
	END
	ELSE
	BEGIN
		SELECT 0;
	END

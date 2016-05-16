CREATE PROCEDURE [dbo].[spOrganizationLocations_FindUrl]
	@Hostname	NVARCHAR(25) = NULL,
	@CustomUrl	NVARCHAR(1024) = NULL
AS
	SELECT 
		 OrganizationId
		,OrganizationName
		,OrganizationHostname
		,OrganizationCustomUrl
		,LocationId 
		,LocationName
		,LocationHostname
		,LocationCustomUrl
	FROM [dbo].[vwOrganizationLocations]
	WHERE 
		(@Hostname IS NULL AND (OrganizationCustomUrl = @CustomUrl OR LocationCustomUrl = @CustomUrl)) OR
		(@CustomUrl IS NULL AND (OrganizationHostname = @Hostname OR LocationHostname = @Hostname))

CREATE VIEW [dbo].[vwOrganizationLocations]
	WITH SCHEMABINDING
	AS SELECT 
		o.Id AS OrganizationId
	   ,o.Name AS OrganizationName
	   ,o.Hostname AS OrganizationHostname
	   ,o.CustomUrl AS OrganizationCustomUrl
	   ,l.Id AS LocationId
	   ,l.Name AS LocationName
	   ,l.Hostname AS LocationHostname
	   ,l.CustomUrl AS LocationCustomUrl
	FROM [dbo].[tblOrganizations] o
	LEFT JOIN [dbo].[tblLocations] l
	ON o.Id = l.OrganizationId

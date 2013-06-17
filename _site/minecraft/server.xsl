<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <h2>Webhippie Minecraft Mods</h2>

        <table border="1">
          <tr bgcolor="#cccccc">
            <th>Name</th>
            <th>URL</th>
            <th>MD5</th>
          </tr>
          <xsl:for-each select="ServerPack/Server/Module">
            <tr>
              <td><xsl:value-of select="@name" /></td>
              <td><a href="{URL}"><xsl:value-of select="URL" /></a></td>
              <td><xsl:value-of select="MD5" /></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

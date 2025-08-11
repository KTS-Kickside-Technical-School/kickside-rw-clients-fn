<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" indent="yes" />

    <xsl:template match="/">
        <html lang="en">
            <head>
                <title>Kickside.rw Sitemap</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width:
                    1000px; margin: 0 auto; padding: 20px; }
                    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin: 25px 0; }
                    th { background-color: #3498db; color: white; text-align: left; padding: 12px; }
                    tr:nth-child(even) { background-color: #f8f9fa; }
                    td { padding: 10px; border: 1px solid #ddd; }
                    a { color: #2980b9; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                    .footer { margin-top: 20px; font-size: 0.9em; color: #7f8c8d; }
                </style>
            </head>
            <body>
                <h1>Kickside.rw Sitemap</h1>
                <table>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Change Frequency</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="sitemap:urlset/sitemap:url">
                            <tr>
                                <td>
                                    <a>
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="sitemap:loc" />
                                        </xsl:attribute>
                                        <xsl:value-of select="sitemap:loc" />
                                    </a>
                                </td>
                                <td>
                                    <xsl:value-of select="sitemap:changefreq" />
                                </td>
                                <td>
                                    <xsl:value-of select="sitemap:priority" />
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
                <div class="footer"> Generated on: <xsl:value-of select="current-dateTime()" /> |
                    Kickside Rwanda </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
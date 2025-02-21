package com.ulfg2.imeps.domain;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class FileGenerator {

    public static InputStreamResource createPdf(FileRequest pdfRequest) throws IOException {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage(new PDRectangle(PDRectangle.A4.getHeight(), PDRectangle.A4.getWidth()));
        document.addPage(page);

        PDPageContentStream contentStream = new PDPageContentStream(document, page);

        // Load and add the logo at the top center (100x100)
        ClassPathResource imgFile = new ClassPathResource("images/ulfglogo.png");
        try (InputStream imgStream = imgFile.getInputStream()) {
            PDImageXObject image = PDImageXObject.createFromByteArray(document, imgStream.readAllBytes(), "ulfglogo.png");
            float imageWidth = 100, imageHeight = 100;
            float centerX = (page.getMediaBox().getWidth() - imageWidth) / 2;
            float topY = page.getMediaBox().getHeight() - 105;
            contentStream.drawImage(image, centerX, topY, imageWidth, imageHeight);
        }

        // Set title below the image and center it
        PDType1Font helveticaBold = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
        contentStream.setFont(helveticaBold, 16);
        String title = pdfRequest.title();
        float titleWidth = helveticaBold.getStringWidth(title) / 1000 * 16; // Calculate title width
        float titleX = (page.getMediaBox().getWidth() - titleWidth) / 2;
        float titleY = page.getMediaBox().getHeight() - 130; // Adjust title position below image
        contentStream.beginText();
        contentStream.newLineAtOffset(titleX, titleY);
        contentStream.showText(title);
        contentStream.endText();

        // Set table properties and center it
        float margin = 50;
        float tableWidth = page.getMediaBox().getWidth() - 2 * margin;
        float yStart = titleY - 40; // Adjust spacing below title
        float rowHeight = 20;
        int numCols = pdfRequest.headers().size();

        // Draw table header
        contentStream.setFont(helveticaBold, 12);
        float xPosition = margin;
        float yPosition = yStart;

        // Draw header with styling
        for (String header : pdfRequest.headers()) {
            contentStream.setLineWidth(1f);
            contentStream.setStrokingColor(0, 0, 0); // Black border for header
            float headerWidth = helveticaBold.getStringWidth(header) / 1000 * 12; // Calculate header width
            contentStream.beginText();
            contentStream.newLineAtOffset(xPosition + (tableWidth / numCols - headerWidth) / 2, yPosition); // Center header
            contentStream.setTextRise(5f);
            contentStream.showText(header);
            contentStream.endText();
            contentStream.setLineWidth(1f);
            contentStream.moveTo(xPosition, yPosition - 2);
            contentStream.lineTo(xPosition + tableWidth / numCols, yPosition - 2);
            contentStream.stroke();
            xPosition += tableWidth / numCols;
        }

        yPosition -= rowHeight;

        // Draw table data with borders and style
        contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA), 12);
        for (List<String> row : pdfRequest.rows()) {
            xPosition = margin;
            for (String cell : row) {
                contentStream.setLineWidth(1f);
                contentStream.setStrokingColor(0, 0, 0); // Black border for cells
                float cellWidth = helveticaBold.getStringWidth(cell) / 1000 * 12; // Calculate cell width
                contentStream.beginText();
                contentStream.newLineAtOffset(xPosition + (tableWidth / numCols - cellWidth) / 2, yPosition); // Center cell
                contentStream.setTextRise(5f);
                contentStream.showText(cell);
                contentStream.endText();
                contentStream.moveTo(xPosition, yPosition - 2);
                contentStream.lineTo(xPosition + tableWidth / numCols, yPosition - 2);
                contentStream.stroke();
                xPosition += tableWidth / numCols;
            }
            yPosition -= rowHeight;
        }

        contentStream.close();

        // Save to byte array
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        document.save(outputStream);
        document.close();

        InputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

        return new InputStreamResource(inputStream);
    }

    public static InputStreamResource createCsv(FileRequest fileRequest) {
        // Convert the FileRequest to CSV format (String)
        String csvContent = generateCsvContent(fileRequest);

        // Convert the CSV string into an InputStream
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(csvContent.getBytes());

        // Return as InputStreamResource
        return new InputStreamResource(byteArrayInputStream);
    }

    // Helper method to generate CSV content from FileRequest
    private static String generateCsvContent(FileRequest fileRequest) {
        StringBuilder csvBuilder = new StringBuilder();

        // Add headers to the CSV
        List<String> headers = fileRequest.headers();
        for (int i = 0; i < headers.size(); i++) {
            csvBuilder.append(headers.get(i));
            if (i < headers.size() - 1) {
                csvBuilder.append(",");
            }
        }
        csvBuilder.append("\n");

        // Add rows to the CSV
        List<List<String>> rows = fileRequest.rows();
        for (List<String> row : rows) {
            for (int i = 0; i < row.size(); i++) {
                csvBuilder.append(row.get(i));
                if (i < row.size() - 1) {
                    csvBuilder.append(",");
                }
            }
            csvBuilder.append("\n");
        }

        return csvBuilder.toString();
    }


}

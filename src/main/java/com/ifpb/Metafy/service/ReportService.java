package com.ifpb.Metafy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ifpb.Metafy.exceptions.NotFoundException;
import com.ifpb.Metafy.model.Report;
import com.ifpb.Metafy.repository.ReportRepository;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Report getReportById(Long id) {
        return reportRepository.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));
    }

    public Report createReport(Report report) {
        return reportRepository.save(report);
    }

    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }

    public Report updateReport(Long id, Report updatedReport) {
        // Busca o relatório existente pelo ID
        Report existingReport = reportRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Report not found with ID: " + id));

        // Atualiza os atributos com os novos valores
        existingReport.setUser(updatedReport.getUser()); // Se quiser alterar o usuário associado
        existingReport.setStartDate(updatedReport.getStartDate());
        existingReport.setEndDate(updatedReport.getEndDate());
        existingReport.setType(updatedReport.getType());

        // Salva o relatório atualizado no banco de dados
        return reportRepository.save(existingReport);
    }
    
}


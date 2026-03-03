package com.autoflex.inventory.infra;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.hibernate.exception.ConstraintViolationException;
import java.util.Map;

@Provider
public class RestExceptionMapper implements ExceptionMapper<Exception> {

    @Override
    public Response toResponse(Exception exception) {
        // Se o erro for de duplicidade (Unique Constraint) ou campos nulos
        if (exception.getCause() instanceof ConstraintViolationException || 
            exception.getMessage().contains("ConstraintViolationException")) {
            
            return Response.status(Response.Status.CONFLICT)
                .entity(Map.of("error", "Code or Name already exists, or a required field is missing."))
                .build();
        }

        // Erro genérico para outros casos
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
            .entity(Map.of("error", "An internal error occurred: " + exception.getMessage()))
            .build();
    }
}
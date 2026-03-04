package com.autoflex.inventory.infra;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.hibernate.exception.ConstraintViolationException;
import java.util.Map;

@Provider
public class RestExceptionMapper implements ExceptionMapper<Throwable> {

    @Override
    public Response toResponse(Throwable exception) {
        // Checks if the error is a database constraint violation (e.g., duplicate unique codes)
        if (isConstraintViolation(exception)) {
            return Response.status(Response.Status.CONFLICT)
                .entity(Map.of("error", "Integrity violation: This business code or name is already in use."))
                .build();
        }

        // Generic handler for other internal server errors
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
            .entity(Map.of("error", "Internal Server Error: " + exception.getLocalizedMessage()))
            .build();
    }

    /**
     * Recursively checks the exception cause chain for Hibernate constraint violations.
     */
    private boolean isConstraintViolation(Throwable e) {
        while (e != null) {
            if (e instanceof ConstraintViolationException) {
                return true;
            }
            e = e.getCause();
        }
        return false;
    }
}
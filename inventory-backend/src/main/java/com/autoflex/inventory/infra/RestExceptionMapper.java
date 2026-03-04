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
        if (isConstraintViolation(exception)) {
            return Response.status(Response.Status.CONFLICT)
                .entity(Map.of("error", "Integrity violation: This code or name is already in use."))
                .build();
        }

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
            .entity(Map.of("error", "Server Error: " + exception.getLocalizedMessage()))
            .build();
    }

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
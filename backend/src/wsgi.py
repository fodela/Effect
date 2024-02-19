from typing import Optional, Any
from . import create_app


# Return the response body from the WSGI application function
def application(environ: Optional[dict[Any, Any]], start_response: Any):
    app = create_app()
    response = app(environ, start_response)
    return response

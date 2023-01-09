from . import create_app

# Return the response body from the WSGI application function
def application(environ, start_response):
    app = create_app()
    response = app(environ, start_response)
    return response
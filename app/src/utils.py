from fastapi.templating import Jinja2Templates
from fastapi import Request


templates = Jinja2Templates(directory="app/templates")

def render(request: Request, name: str, context: dict | None = None):
    """Renderiza una plantilla HTML con el contexto proporcionado.
    Args:
        request (Request): El objeto de solicitud FastAPI.
        name (str): El nombre del archivo de plantilla HTML a renderizar.
        context (dict, optional): Un diccionario con el contexto para la plantilla. Por defecto es None.
    """
    if context is None:
        context = {}
        print("Contexto vacío, se usará un diccionario vacío.")
    return templates.TemplateResponse(name, {"request": request, **context})

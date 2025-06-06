from fastapi.templating import Jinja2Templates
from fastapi import Request


templates = Jinja2Templates(directory="app/src/templates")

def render(request: Request, name: str, context: dict = {}):
    return templates.TemplateResponse(name, {"request": request, **context})

    

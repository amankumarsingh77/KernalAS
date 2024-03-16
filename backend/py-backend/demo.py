from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI()
llm.invoke("Hello, world!")
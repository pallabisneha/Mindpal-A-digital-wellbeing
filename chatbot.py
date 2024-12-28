import streamlit as st
import google.generativeai as genai

# API Key Declaration
API_KEY = "AIzaSyD24UMOYh-GjOw4unltJ8jW9vFRqJRkTlk"

# Configure model with the provided API key
genai.configure(api_key=API_KEY)

def get_gemini_response(question):
    model = genai.GenerativeModel("gemini-pro")  # model name 
    chat = model.start_chat(history=[])
    response = chat.send_message(question, stream=True)
    return response

st.set_page_config(page_title="Mind Pal Assistant", page_icon="🤖🧠", layout="centered")

st.markdown(
    """
    <style>
    .user-message, .bot-message {
        margin: 5px 0;
        max-width: 80%;
    }
    .user-message {
        text-align: right;
        align-self: flex-end;
    }
    .bot-message {
        text-align: left;
        align-self: flex-start;
    }
    .chat-container {
        padding: 20px;
        border-radius: 10px;
        max-height: 400px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }
    </style>
    """,
    unsafe_allow_html=True
)

# app header
st.title("🧠Mind Pal Assistant 🤖")
st.write("Ask anything, and let the assistant provide you a stress-free mind !!")

# Initialize chat history
if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = []

user_input = st.text_input("Write your question here:", key="input")
submit_button = st.button("Ask the Question")

# Display responses
st.subheader("RESPONSES:")
with st.container():
    st.write('<div class="chat-container">', unsafe_allow_html=True)
    for role, text in st.session_state['chat_history']:
        message_class = "user-message" if role == "You" else "bot-message"
        st.write(f'<div class="{message_class}"><strong>{role}:</strong> {text}</div>', unsafe_allow_html=True)
    st.write('</div>', unsafe_allow_html=True)


if submit_button and user_input:
    response = get_gemini_response(user_input)

    # Update chat history with user input
    st.session_state['chat_history'].append(("You", user_input))

    
    response_text = ""
    for chunk in response:
        response_text += chunk.text
        st.session_state['chat_history'].append(("Assistant", chunk.text))

    st.write('<div class="bot-message"><strong>Assistant:</strong> {}</div>'.format(response_text), unsafe_allow_html=True)

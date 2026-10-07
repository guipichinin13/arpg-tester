import os
import time
import subprocess
import hashlib

# Obtém a pasta onde o script está rodando
REPO_DIR = os.path.dirname(os.path.abspath(__file__))
FILE_TO_WATCH = os.path.join(REPO_DIR, "index.html")

def get_file_hash(filepath):
    if not os.path.exists(filepath):
        return None
    with open(filepath, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def push_to_github():
    try:
        print("\n[Vibe Coding] Alteração detectada no Drive! Sincronizando...")
        subprocess.run(["git", "add", "."], cwd=REPO_DIR, check=True)
        subprocess.run(["git", "commit", "-m", "Auto-update via Google Drive Vibe Coding"], cwd=REPO_DIR, check=True)
        subprocess.run(["git", "push", "-u", "origin", "main"], cwd=REPO_DIR, check=True)
        print("[Vibe Coding] Enviado para o GitHub com sucesso! O Netlify está atualizando o jogo...")
    except Exception as e:
        print(f"[Erro] Falha ao enviar para o Git: {e}")

print("=== Monitoramento Ativo do ARPG ===")
print(f"Monitorando atualizações do Google Drive na pasta: {REPO_DIR}")

last_hash = get_file_hash(FILE_TO_WATCH)

# Roda continuamente checando por atualizações a cada 3 segundos
while True:
    time.sleep(3)
    current_hash = get_file_hash(FILE_TO_WATCH)
    if current_hash and current_hash != last_hash:
        push_to_github()
        last_hash = current_hash
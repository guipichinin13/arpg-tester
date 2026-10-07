import os
import time
import subprocess
import hashlib
from datetime import datetime

# Configurações do Repositório
REPO_DIR = os.path.dirname(os.path.abspath(__file__))

def get_timestamp():
    return datetime.now().strftime("[%H:%M:%S]")

def calculate_folder_hash(folder_path):
    """Calcula um hash único baseado em todos os arquivos das pastas (recursivo)"""
    hasher = hashlib.md5()
    for root, dirs, files in os.walk(folder_path):
        # Ignora a pasta oculta .git para não entrar em loop
        if '.git' in root:
            continue
        for file in sorted(files):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "rb") as f:
                    while chunk := f.read(8192):
                        hasher.update(chunk)
            except Exception:
                pass
    return hasher.hexdigest()

def push_to_github():
    print(f"\n{get_timestamp()} 🔄 [Vibe Coding] Alterações detectadas nas pastas/arquivos!")
    try:
        print(f"{get_timestamp()} 📦 Adicionando arquivos ao Git (git add)...")
        subprocess.run(["git", "add", "."], cwd=REPO_DIR, check=True, capture_output=True)
        
        print(f"{get_timestamp()} 📝 Criando commit automático...")
        commit_msg = f"Auto-update via Vibe Coding - {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}"
        subprocess.run(["git", "commit", "-m", commit_msg], cwd=REPO_DIR, check=True, capture_output=True)
        
        print(f"{get_timestamp()} 🚀 Enviando para o GitHub (git push)...")
        push_result = subprocess.run(["git", "push", "origin", "main"], cwd=REPO_DIR, check=True, capture_output=True, text=True)
        
        print(f"{get_timestamp()} ✅ [SUCESSO] Código enviado com sucesso para o GitHub! O Netlify atualizará o site em instantes.")
    except subprocess.CalledProcessError as e:
        print(f"{get_timestamp()} ❌ [ERRO] Falha ao enviar para o Git:")
        if e.stderr:
            print(e.stderr.strip())
        else:
            print(str(e))

print("==================================================")
print(" 🛡️  MONITOR DE VIBE CODING ATIVO (RECURSIVO)     ")
print("==================================================")
print(f"📂 Pasta monitorada: {REPO_DIR}")
print("Status: Aguardando alterações nas pastas css/, js/ ou raiz...\n")

last_hash = calculate_folder_hash(REPO_DIR)

# Loop contínuo de verificação a cada 3 segundos
while True:
    time.sleep(3)
    current_hash = calculate_folder_hash(REPO_DIR)
    
    if current_hash != last_hash:
        push_to_github()
        last_hash = current_hash
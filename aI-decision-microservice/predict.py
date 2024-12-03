import sys
import json
import torch
import torch.nn as nn

# Загружаем модель (пример модели)
class SimpleModel(nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.fc = nn.Linear(3, 1)  # Пример линейного слоя

    def forward(self, x):
        return self.fc(x)

# Инициализация модели и загрузка весов
model = SimpleModel()
model.load_state_dict(torch.load('model.pth'))
model.eval()

# Чтение входных данных
input_data = json.loads(sys.argv[1])
input_tensor = torch.tensor([input_data['price'], input_data['volume'], 1.0], dtype=torch.float32)

# Предсказание
with torch.no_grad():
    prediction = model(input_tensor).item()
    decision = 'buy' if prediction > 0.5 else 'sell'
    print(decision)

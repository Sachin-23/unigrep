import pathlib
import pandas as pd

def copy(data: pd.DataFrame, params = {}):
	pass

def move(data: pd.DataFrame, params = {}):
	pass

def delete(data: pd.DataFrame, params = {}):
	pass

def run_command(data: pd.DataFrame, params = {}):
	pass

apply_operations = {
	"copy": copy,
	"move": move,
	"delete": delete,
	"run_command": run_command
}


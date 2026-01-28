import pyttsx3
import threading
import os
import winsound
import time

class SoundManager:
    def __init__(self):
        self.tts_engine = pyttsx3.init()
        self.tts_engine.setProperty('rate', 200)  # Faster speech (was 150)
        self.tts_engine.setProperty('volume', 0.9)  # Volume
        
        self.narration_enabled = True
        self.sound_enabled = True
        self.tts_thread = None
        
    def toggle_narration(self):
        """Toggle text-to-speech on/off"""
        self.narration_enabled = not self.narration_enabled
        return self.narration_enabled
    
    def toggle_sound(self):
        """Toggle sound effects on/off"""
        self.sound_enabled = not self.sound_enabled
        return self.sound_enabled
    
    def speak(self, text):
        """Speak text in background thread"""
        if not self.narration_enabled:
            return
        
        # Run speech in a separate thread to avoid blocking UI
        self.tts_thread = threading.Thread(target=self._speak_thread, args=(text,))
        self.tts_thread.daemon = True
        self.tts_thread.start()
    
    def _speak_thread(self, text):
        """Internal method to run TTS in thread"""
        try:
            self.tts_engine.say(text)
            self.tts_engine.runAndWait()
        except:
            # Silently ignore TTS errors to prevent loop conflicts
            pass
    
    def play_sound(self, sound_type):
        """Play simple system beep sounds"""
        if not self.sound_enabled:
            return
        
        try:
            if sound_type == "buy":
                # Success sound - two beeps
                winsound.Beep(800, 150)
                time.sleep(0.1)
                winsound.Beep(1000, 150)
            elif sound_type == "sell":
                # Success sound - different pattern
                winsound.Beep(1000, 150)
                time.sleep(0.1)
                winsound.Beep(800, 150)
            elif sound_type == "increase":
                # Price up - ascending
                winsound.Beep(600, 100)
            elif sound_type == "decrease":
                # Price down - descending
                winsound.Beep(400, 100)
            elif sound_type == "error":
                # Error sound - buzzer
                winsound.Beep(300, 200)
            elif sound_type == "notification":
                # Notification - ding
                winsound.Beep(900, 200)
        except Exception as e:
            print(f"Sound Error: {e}")
    
    def read_news(self, headline):
        """Read news headline with emphasis"""
        text = f"Breaking news: {headline}"
        self.speak(text)
    
    def read_stock_update(self, symbol, action, quantity, price):
        """Read stock transaction"""
        if action == "buy":
            text = f"You bought {quantity} shares of {symbol} at {price} dollars"
            self.play_sound("buy")
        else:
            text = f"You sold {quantity} shares of {symbol} at {price} dollars"
            self.play_sound("sell")
        self.speak(text)
    
    def read_price_change(self, symbol, change_percent, direction):
        """Read price change update"""
        direction_text = "increased" if direction == "up" else "decreased"
        text = f"{symbol} price has {direction_text} by {abs(change_percent)} percent"
        
        if direction == "up":
            self.play_sound("increase")
        else:
            self.play_sound("decrease")
        
        self.speak(text)
    
    def read_portfolio_update(self, cash, total_value):
        """Read portfolio status"""
        text = f"Your current cash is {cash} dollars. Total portfolio value is {total_value} dollars"
        self.play_sound("notification")
        self.speak(text)
    
    def cleanup(self):
        """Clean up resources"""
        try:
            if self.tts_thread and self.tts_thread.is_alive():
                pass  # Thread will exit naturally
        except:
            pass

using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

// مدیر بازی: امتیاز، جان، پایان مرحله و ذخیره‌ی پیشرفت
public class GameManager : MonoBehaviour
{
    public Text scoreText;
    public int lives = 3;
    private int score = 0;

    void Start()
    {
        UpdateUI();
    }

    public void AddScore(int amount)
    {
        score += amount;
        UpdateUI();
    }

    public void PlayerHit()
    {
        lives--;
        if (lives <= 0)
        {
            SceneManager.LoadScene("Menu");
        }
    }

    public void LevelComplete()
    {
        int next = SceneManager.GetActiveScene().buildIndex + 1;
        PlayerPrefs.SetInt("UnlockedLevel", next);
        PlayerPrefs.Save();
        SceneManager.LoadScene("Menu");
    }

    void UpdateUI()
    {
        if (scoreText != null) scoreText.text = "امتیاز: " + score;
    }
}

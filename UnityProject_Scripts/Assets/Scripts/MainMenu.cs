using UnityEngine;
using UnityEngine.SceneManagement;

// منوی اصلی: شروع از آخرین مرحله‌ی باز شده و خروج
public class MainMenu : MonoBehaviour
{
    public void PlayGame()
    {
        int unlocked = PlayerPrefs.GetInt("UnlockedLevel", 1);
        SceneManager.LoadScene("Level" + unlocked);
    }

    public void QuitGame()
    {
        Application.Quit();
    }
}

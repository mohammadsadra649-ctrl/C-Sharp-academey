using UnityEngine;

// سکه: با برخورد بازیکن امتیاز می‌دهد و ناپدید می‌شود
public class Coin : MonoBehaviour
{
    public int value = 1;

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            FindObjectOfType<GameManager>().AddScore(value);
            Destroy(gameObject);
        }
    }
}

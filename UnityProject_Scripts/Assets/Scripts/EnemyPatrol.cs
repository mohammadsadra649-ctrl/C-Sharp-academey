using UnityEngine;

// دشمن با حرکت رفت‌وبرگشتی؛ برخورد با بازیکن را به GameManager گزارش می‌دهد
public class EnemyPatrol : MonoBehaviour
{
    public float speed = 2f;
    public float distance = 3f;
    private Vector3 start;
    private int dir = 1;

    void Start()
    {
        start = transform.position;
    }

    void Update()
    {
        transform.Translate(Vector3.right * dir * speed * Time.deltaTime);
        if (transform.position.x > start.x + distance) dir = -1;
        if (transform.position.x < start.x - distance) dir = 1;
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            FindObjectOfType<GameManager>().PlayerHit();
        }
    }
}

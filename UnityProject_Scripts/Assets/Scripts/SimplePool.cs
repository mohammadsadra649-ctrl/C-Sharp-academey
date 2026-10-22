using System.Collections.Generic;
using UnityEngine;

// Object Pool ساده: اشیا از قبل ساخته و غیرفعال می‌شوند؛ Get یکی را فعال و برمی‌گرداند
public class SimplePool : MonoBehaviour
{
    public GameObject prefab;
    public int size = 10;
    private readonly Queue<GameObject> pool = new Queue<GameObject>();

    void Start()
    {
        for (int i = 0; i < size; i++)
        {
            GameObject o = Instantiate(prefab);
            o.SetActive(false);
            pool.Enqueue(o);
        }
    }

    public GameObject Get()
    {
        GameObject o = pool.Dequeue();
        o.SetActive(true);
        pool.Enqueue(o);
        return o;
    }
}
